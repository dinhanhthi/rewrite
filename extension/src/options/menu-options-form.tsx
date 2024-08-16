import data, { EmojiMartData } from '@emoji-mart/data'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
  Plus,
  Trash,
  TriangleAlert
} from 'lucide-react'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  Control,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useForm,
  useFormState,
  useWatch
} from 'react-hook-form'
import FormEmoji from '../components/form-emoji'
import FormInput from '../components/form-input'
import FormSwitch from '../components/form-switch'
import FormTextarea from '../components/form-textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../components/ui/accordion'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import TooltipThi from '../components/ui/tooltip-thi'
import { FormMenuOptionsSchema, MAX_OPTIONS, systemIcons } from '../config'
import { cn } from '../helpers/helpers'
import { FormMenuOptions } from '../type'

type MoveItemDirection = 'up' | 'down'

type MenuOptionsFormProps = {
  menuOptions: FormMenuOptions
  setMenuOptions: (menuOptions: FormMenuOptions) => void
  triggerAdd?: boolean
}

const FocusContext = createContext({
  focusedIndex: null as number | null,
  setFocusedIndex: (_index: number | null) => {},
  setValue: (_name: any, _value: any) => {},
  getValues: (_name: any) => ''
})

export default function MenuOptionsForm(props: MenuOptionsFormProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const form = useForm<FormMenuOptions>({
    defaultValues: props.menuOptions,
    resolver: zodResolver(FormMenuOptionsSchema),
    mode: 'onChange'
  })

  function onSubmit(data: FormMenuOptions) {
    if (form.formState.isValid) {
      props.setMenuOptions(data)
      form.reset(data)
    }
  }

  const {
    fields: parentFields,
    append: appendParent,
    remove: removeParent,
    move: moveParent
  } = useFieldArray({ control: form.control, name: 'options' })

  const moveItem = (index: number, direction: MoveItemDirection): void => {
    moveItemGeneral(index, direction, moveParent, parentFields)
  }

  const formState = useFormState({ control: form.control, name: 'options' })
  const error = formState.errors?.options

  const bodyContainerRef = useRef<HTMLDivElement>(null)
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    if (bodyContainerRef?.current && isAdding) {
      bodyContainerRef.current.scrollTo({
        top: bodyContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [parentFields.length])

  useEffect(() => {
    handleAddOption()
  }, [props.triggerAdd])

  const handleAddOption = () => {
    appendParent({
      system: false,
      icon: getRandomEmoji(),
      value: `option-${parentFields.length + 1}`,
      displayName: '',
      available: true,
      prompt: '',
      enableNestedOptions: false
    })
    setIsAdding(true)
  }

  const handleRemoveItem = (index: number) => {
    removeParent(index)
    setIsAdding(false)
    setFocusedIndex(null)
  }

  return (
    <FocusContext.Provider
      value={{ focusedIndex, setFocusedIndex, setValue: form.setValue, getValues: form.getValues }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 gap-4">
          <div
            ref={bodyContainerRef}
            className="flex flex-col flex-1 min-h-0 gap-4 overflow-auto dat-scrollbar dat-scrollbar-small"
          >
            {parentFields.map((item: any, index: number) => {
              return (
                <Item
                  key={item.id}
                  name="options"
                  nestedName="nestedOptions"
                  index={index}
                  control={form.control}
                  remove={handleRemoveItem}
                  moveItem={moveItem}
                  isFirst={index === 0}
                  isLast={index === parentFields.length - 1}
                  isFocus={focusedIndex === index}
                />
              )
            })}
          </div>

          {/* <AddMoreOptionButton
            disabled={error?.type === 'too_big'}
            tooltip={error?.type === 'too_big' ? (error?.message as string) : ''}
            onClick={handleAddOption}
          /> */}
        </form>
      </Form>
    </FocusContext.Provider>
  )
}

function moveItemGeneral(
  index: number,
  direction: MoveItemDirection,
  move: UseFieldArrayMove,
  fields: Record<'id', string>[]
) {
  if (direction === 'up' && index > 0) {
    move(index, index - 1)
  } else if (direction === 'down' && index < fields.length - 1) {
    move(index, index + 1)
  }
}

const Item = (props: {
  index: number
  control: Control<any, any>
  name: string
  nestedName: string
  remove: (index: number) => void
  moveItem: MoveItemFunc
  isFirst: boolean
  isLast: boolean
  isFocus: boolean
}) => {
  const nameIndex = `${props.name}[${props.index}]`
  const watchValue = useWatch({ control: props.control, name: nameIndex })

  const {
    fields: nestedFields,
    append: appendNested,
    remove: removeNested,
    move: moveNested
  } = useFieldArray({
    control: props.control,
    name: `${nameIndex}.${props.nestedName}`
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    if (containerRef.current && isAdding) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [nestedFields.length])

  const handleAddNestedOption = () => {
    appendNested({
      system: false,
      icon: getRandomEmoji(),
      value: `option-${props.index}-${nestedFields.length + 1}`,
      displayName: '',
      available: true,
      prompt: ''
    })
    setIsAdding(true)
  }

  const handleRemoveNestedItem = (index: number) => {
    removeNested(index)
    setIsAdding(false)
  }

  const moveNestedItem = (_index: number, _direction: MoveItemDirection) => {
    moveItemGeneral(_index, _direction, moveNested, nestedFields)
  }

  const isEmpty = nestedFields.length === 0

  return (
    <div
      className={cn('flex flex-col border rounded-lg bg-gray-50', {
        'border-green-600 shadow-sm shadow-green-100': props.isFocus,
        'border-slate-200': !props.isFocus
      })}
    >
      <ItemTemplate
        watchValue={watchValue}
        index={props.index}
        control={props.control}
        nameIndex={nameIndex}
        moveItem={props.moveItem}
        remove={props.remove}
        isFirst={props.isFirst}
        isLast={props.isLast}
        parentIndex={props.index}
      />

      <div
        className={cn('px-4 pb-4', {
          hidden: !watchValue?.enableNestedOptions
        })}
      >
        <Accordion
          type="single"
          collapsible
          defaultValue={nestedFields.length === 0 ? 'item-1' : ''}
        >
          <AccordionItem value="item-1" className="border-none">
            <div
              className={cn(
                'relative flex flex-col gap-4 pt-6 mt-4 border bg-transparent rounded-xl dat-border-accordion',
                {
                  'border-slate-300': !isEmpty,
                  'border-destructive': isEmpty
                }
              )}
            >
              <div className="absolute flex items-center gap-2 py-1 pl-2 pr-4 text-base font-medium bg-gray-50 -left-4 -top-5">
                <AccordionTrigger className="h-4"></AccordionTrigger>
                <span>Nested options of{'  '}</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-sm text-white scale-90 bg-gray-400 border rounded-full">
                  {props.index + 1}
                </span>
                <span className="text-sm opacity-80">({nestedFields.length} items)</span>
                {isEmpty && (
                  <TooltipThi content="At least one nested option is required!">
                    <TriangleAlert className="inline w-5 h-5 text-destructive" />
                  </TooltipThi>
                )}
              </div>

              <AccordionContent>
                <div
                  className={cn('flex flex-col gap-4', {
                    'pb-4': nestedFields.length === 0
                  })}
                >
                  <div
                    ref={containerRef}
                    className="max-h-[400px] overflow-auto dat-scrollbar dat-scrollbar-small flex flex-col gap-4"
                  >
                    {nestedFields.map((nestedItem, nestedIndex) => (
                      <NestedItem
                        index={nestedIndex}
                        parentIndex={props.index}
                        key={nestedItem.id}
                        parentName={props.name}
                        name={props.nestedName}
                        control={props.control}
                        remove={handleRemoveNestedItem}
                        moveItem={moveNestedItem}
                        isFirst={nestedIndex === 0}
                        isLast={nestedIndex === nestedFields.length - 1}
                      />
                    ))}
                  </div>
                  <AddMoreOptionButton
                    disabled={nestedFields.length > MAX_OPTIONS}
                    tooltip={
                      nestedFields.length > MAX_OPTIONS
                        ? 'Maximum number of nested active options reached!'
                        : ''
                    }
                    onClick={handleAddNestedOption}
                    isNested
                  />
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

const NestedItem = (props: {
  index: number
  parentIndex: number
  parentName: string
  name: string
  control: Control<any, any>
  remove: (index: number) => void
  moveItem: MoveItemFunc
  isFirst: boolean
  isLast: boolean
}) => {
  const nameIndex = `${props.parentName}[${props.parentIndex}].${props.name}[${props.index}]`
  const watchValue = useWatch({ control: props.control, name: nameIndex })

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 bg-gray-100 border rounded-lg border-slate-200">
        <ItemTemplate
          watchValue={watchValue}
          index={props.index}
          parentIndex={props.parentIndex}
          control={props.control}
          nameIndex={nameIndex}
          moveItem={props.moveItem}
          remove={props.remove}
          isFirst={props.isFirst}
          isLast={props.isLast}
          isNested={true}
        />
      </div>
    </div>
  )
}

/**
 * This template is used for both item and nested item
 */
const ItemTemplate = (props: {
  watchValue?: any
  index: number
  parentIndex?: number
  control: Control<any, any>
  nameIndex: string
  moveItem: MoveItemFunc
  remove: (index: number) => void
  isFirst: boolean
  isLast: boolean
  isNested?: boolean
}) => {
  const { setFocusedIndex, setValue, getValues } = useContext(FocusContext)
  const [confirmRemoveAtIndex, setConfirmRemoveAtIndex] = useState<number>(-1)

  const handleFocus = () => {
    if (props.parentIndex !== undefined) {
      setFocusedIndex(props.parentIndex)
    }
  }

  const handleMoveItemClicked = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: MoveItemDirection
  ) => {
    e.preventDefault()
    e.stopPropagation()
    props.moveItem(props.index, direction)
  }

  const initialEmoji = getValues(`${props.nameIndex}.icon`) as string
  const SysIcon = systemIcons.find(e => e.value === props.watchValue?.value)?.icon

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-gray-600 border rounded-full shadow-sm">
            {props.isNested ? convertIndexToAlphabet(props.index) : props.index + 1}
          </div>

          <FormSwitch
            control={props.control}
            name={`${props.nameIndex}.available`}
            labelClassName="text-sm"
            size="smaller"
            tooltip={
              props.watchValue?.enableNestedOptions
                ? `Disable this ${props.isNested ? 'nested' : ''} option`
                : `Enable this ${props.isNested ? 'nested' : ''} option`
            }
            controlComesFirst={true}
          />

          <div className="flex flex-row items-center gap-2">
            <TooltipThi content={`Move this ${props.isNested ? 'nested' : ''} option up`}>
              <Button
                disabled={props.isFirst}
                className="w-6 h-6"
                variant="ghost"
                size="icon"
                onClick={e => handleMoveItemClicked(e, 'up')}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </TooltipThi>

            <TooltipThi content={`Move this ${props.isNested ? 'nested' : ''} option down`}>
              <Button
                disabled={props.isLast}
                className="w-6 h-6"
                variant="ghost"
                size="icon"
                onClick={e => handleMoveItemClicked(e, 'down')}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </TooltipThi>

            {props.watchValue?.system && (
              <Badge className="bg-gray-500 hover:bg-gray-500">built-in</Badge>
            )}
          </div>
        </div>

        {confirmRemoveAtIndex !== props.index && (
          <TooltipThi content={`Remove this ${props.isNested ? 'nested' : ''} option`}>
            <button
              className="group"
              type="button"
              onClick={() => setConfirmRemoveAtIndex(props.index)}
            >
              <Trash className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
          </TooltipThi>
        )}

        {confirmRemoveAtIndex === props.index && (
          <div className="flex items-center justify-center gap-2">
            <TooltipThi content="Confirm remove">
              <button
                className=""
                onClick={() => {
                  props.remove(props.index)
                  setConfirmRemoveAtIndex(-1)
                }}
              >
                <CircleCheck className="w-5 h-5 text-destructive" />
              </button>
            </TooltipThi>
            <TooltipThi content="Cancel remove">
              <button className="" onClick={() => setConfirmRemoveAtIndex(-1)}>
                <CircleX className="w-5 h-5 text-destructive" />
              </button>
            </TooltipThi>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-4 gap-x-6 md:flex-row md:items-center">
        {!props.watchValue?.system && (
          <FormEmoji
            control={props.control}
            name={`${props.nameIndex}.icon`}
            initialValue={initialEmoji}
            setValue={setValue}
          />
        )}

        {props.watchValue?.system && !!SysIcon && (
          <div className="flex flex-row items-center gap-3">
            Icon
            <div className="flex items-center justify-center w-8 h-8 bg-white border rounded-md">
              <SysIcon className="w-4 h-4 text-green-700" />
            </div>
          </div>
        )}

        <FormInput
          control={props.control}
          type="text"
          name={`${props.nameIndex}.displayName`}
          label="Disaply name"
          labelClassName="text-sm"
          placeholder="eg. Translate"
          className="w-full"
          wrap={false}
          onFocus={handleFocus}
          disabled={props.watchValue?.system}
        />
      </div>

      {!props.isNested && !props.watchValue?.system && (
        <FormSwitch
          control={props.control}
          name={`${props.nameIndex}.enableNestedOptions`}
          label={
            props.watchValue?.enableNestedOptions
              ? "Nested options are enabled (parent's prompt is disabled)"
              : "Nested options are disabled (parent's prompt is required)"
          }
          labelClassName="text-sm"
          size="smaller"
          controlComesFirst={true}
        />
      )}

      {!props.watchValue?.system && (
        <FormTextarea
          disabled={props.watchValue?.enableNestedOptions}
          control={props.control}
          name={`${props.nameIndex}.prompt`}
          label="Prompt"
          labelClassName="text-sm"
          placeholder="eg. Translate the given text to English."
          className={cn('w-full', {
            hidden: props.watchValue?.enableNestedOptions
          })}
          wrap={true}
          rows={2}
          onFocus={handleFocus}
        />
      )}
    </div>
  )
}

type MoveItemFunc = (index: number, direction: MoveItemDirection) => void

function convertIndexToAlphabet(index: number) {
  return String.fromCharCode(65 + index)
}

const AddMoreOptionButton = (props: {
  onClick: () => void
  isNested?: boolean
  disabled?: boolean
  tooltip?: string
}) => {
  return (
    <TooltipThi content={props.tooltip || ''}>
      <button
        disabled={props.disabled}
        className={cn(
          'flex flex-row items-center gap-2 mx-auto flex-nowrap opacity-70 hover:opacity-100',
          {
            'scale-95': props.isNested
          }
        )}
        type="button"
        onClick={props.onClick}
      >
        <div className="flex items-center justify-center border-2 border-dotted rounded-md border-slate-500">
          <Plus className="w-4 h-4" />
        </div>{' '}
        {`Add ${props.isNested ? 'nested' : ''} option`}
      </button>
    </TooltipThi>
  )
}

function getRandomEmoji() {
  const dataEmoji = data as EmojiMartData
  const keys = Object.keys(dataEmoji.emojis)
  const randomKeys = keys[Math.floor(Math.random() * keys.length)]
  const randomEmoji = dataEmoji.emojis[randomKeys].skins[0].native
  return randomEmoji
}
