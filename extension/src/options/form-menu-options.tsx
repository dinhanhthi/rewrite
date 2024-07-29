import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

export type FormMenuOptionsProps = {
  items: any
  form: UseFormReturn<any>
  name: string
  // children: React.ReactNode
}

export default function FormMenuOptions(props: FormMenuOptionsProps) {
  const { form, items, name } = props

  // const [isDropped, setIsDropped] = useState(false);

  // const {isOver, setNodeRef: setNodeDropRef} = useDroppable({
  //   id: 'droppable',
  // });
  // const styleDrop = {
  //   color: isOver ? 'green' : undefined,
  // };

  // const {attributes, listeners, setNodeRef: setNodeDragRef, transform} = useDraggable({
  //   id: 'draggable',
  // });
  // const styleDrag = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;

  // const handleDragEnd = (event: any) => {
  //   if (event.over && event.over.id === 'droppable') {
  //     setIsDropped(true);
  //   }
  // }

  // const {
  //   fields,
  //   // append: appendSentiment,
  //   // remove: removeSentiment,
  //   move
  // } = useFieldArray({
  //   control: form.control,
  //   name: 'menuOptions'
  // })
  // return (<DndContext onDragEnd={handleDragEnd}>
  //   <button ref={setNodeDropRef} style={styleDrop} {...listeners} {...attributes}>
  //     Drop here
  //   </button>
  //   <div ref={setNodeDragRef} style={styleDrag}>
  //     Drag me
  //   </div>
  // </DndContext>)

  const onDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item: any) => item.id === active.id)
      const newIndex = items.findIndex((item: any) => item.id === over.id)

      form.setValue('menuOptions', arrayMove(items, oldIndex, newIndex))
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  return (
    <div className="flex flex-col gap-2">
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <SortableContext
          items={items.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item: any, index: any) => (
            <DraggableItem key={item.id} id={item.id} index={index} control={form.control} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

const DraggableItem = ({ id, index, control }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    margin: '4px',
    border: '1px solid gray',
    backgroundColor: 'white',
    cursor: 'grab'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Controller
        name={`menuOptions[${index}].name`}
        control={control}
        render={({ field }) => (
          <input onChange={field.onChange} value={field.value} placeholder={`Item ${id}`} />
        )}
      />
    </div>
  )
}
