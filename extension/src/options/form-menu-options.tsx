import data, { EmojiMartData } from '@emoji-mart/data'
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
  Info,
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
  UseFormGetValues,
  UseFormSetValue,
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
import TooltipThi from '../components/ui/tooltip-thi'
import { MAX_OPTIONS, systemIcons } from '../config'
import { cn } from '../helpers/helpers'
import { FormSettings } from '../type'

const FocusContext = createContext({
  focusedIndex: null as number | null,
  setFocusedIndex: (_index: number | null) => {},
  setValue: (_name: any, _value: any) => {},
  getValue: (_name: any) => ''
})

export type FormMenuOptionsProps = {
  control: Control<any, any>
  name: string
  nestedName: string
  setValue: UseFormSetValue<FormSettings>
  getValue: UseFormGetValues<FormSettings>
}

export default function FormMenuOptions(props: FormMenuOptionsProps) {
  const { control, name, nestedName, setValue, getValue } = props
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const {
    fields: parentFields,
    append: appendParent,
    remove: removeParent,
    move: moveParent
  } = useFieldArray({ control, name })

  const handleAddItem = () => {
    appendParent({
      system: false,
      icon: getRandomEmoji(),
      value: `option-${parentFields.length + 1}`,
      displayName: '',
      available: true,
      prompt: '',
      enableNestedOptions: false
    })
  }

  const moveItem = (index: number, direction: MoveItemDirection) => {
    moveItemGeneral(index, direction, moveParent, parentFields)
  }

  const formState = useFormState({ control, name })
  const error = formState.errors?.menuOptions

  return (
    <FocusContext.Provider value={{ focusedIndex, setFocusedIndex, setValue, getValue }}>
      <div
        className={cn('relative flex flex-col gap-4 py-4 pt-6 mt-4 border rounded-xl', {
          'border-destructive': !!error,
          'pb-8': parentFields.length === 0
        })}
      >
        <div className="absolute flex items-center justify-between w-full pr-4 -left-2 -top-4">
          <div className="py-1 pl-2 pr-4 text-base font-medium bg-white">
            <div className="flex flex-row items-center gap-2">
              Menu options <span className="text-sm opacity-80">({parentFields.length} items)</span>
              <TooltipThi content="To see what it looks like, click the Preview button in the footer">
                <Info className="w-5 h-5 text-slate-500" />
              </TooltipThi>
              {error && (
                <TooltipThi content={(error.message as string) || "Some option isn't valid!"}>
                  <TriangleAlert className="inline w-5 h-5 text-destructive" />
                </TooltipThi>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {parentFields.map((item: any, index: number) => {
            return (
              <Item
                key={item.id}
                name={name}
                nestedName={nestedName}
                index={index}
                control={control}
                remove={removeParent}
                moveItem={moveItem}
                isFirst={index === 0}
                isLast={index === parentFields.length - 1}
                isFocus={focusedIndex === index}
              />
            )
          })}
        </div>

        <AddMoreOptionButton
          disabled={error?.type === 'too_big'}
          tooltip={error?.type === 'too_big' ? (error?.message as string) : ''}
          onClick={handleAddItem}
        />
      </div>
    </FocusContext.Provider>
  )
}

const Item = (props: {
  index: number
  control: Control<any, any>
  name: string
  nestedName: string
  remove: UseFieldArrayRemove
  moveItem: MoveItemFunc
  isFirst: boolean
  isLast: boolean
  isFocus: boolean
}) => {
  const { index, control, name, nestedName, remove, moveItem, isFirst, isLast, isFocus } = props
  const nameIndex = `${name}[${index}]`
  const watchValue = useWatch({ control, name: nameIndex })

  const {
    fields: nestedFields,
    append: appendNested,
    remove: removeNested,
    move: moveNested
  } = useFieldArray({
    control,
    name: `${nameIndex}.${nestedName}`
  })

  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [nestedFields.length])

  const handleAddNestedItem = () => {
    appendNested({
      system: false,
      icon: getRandomEmoji(),
      value: `option-${index}-${nestedFields.length + 1}`,
      displayName: '',
      available: true,
      prompt: ''
    })
  }

  const moveNestedItem = (_index: number, _direction: MoveItemDirection) => {
    moveItemGeneral(_index, _direction, moveNested, nestedFields)
  }

  const isEmpty = nestedFields.length === 0

  return (
    <div className="px-4">
      <div
        className={cn('flex flex-col flex-1 border rounded-lg bg-gray-50 overflow-hidden', {
          'border-green-600 shadow-sm shadow-green-100': isFocus,
          'border-slate-200': !isFocus
        })}
      >
        <ItemTemplate
          watchValue={watchValue}
          index={index}
          control={control}
          nameIndex={nameIndex}
          moveItem={moveItem}
          remove={remove}
          isFirst={isFirst}
          isLast={isLast}
          parentIndex={index}
        />

        <div
          className={cn('px-4 pb-4', {
            hidden: !watchValue.enableNestedOptions
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
                    {index + 1}
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
                          parentIndex={index}
                          key={nestedItem.id}
                          parentName={name}
                          name={nestedName}
                          control={control}
                          remove={removeNested}
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
                      onClick={handleAddNestedItem}
                      isNested
                    />
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
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
  remove: UseFieldArrayRemove
  moveItem: MoveItemFunc
  isFirst: boolean
  isLast: boolean
}) => {
  const { parentIndex, parentName, name, index, control, remove, moveItem, isFirst, isLast } = props
  const nameIndex = `${parentName}[${parentIndex}].${name}[${index}]`
  const watchValue = useWatch({ control, name: nameIndex })

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 bg-gray-100 border rounded-lg border-slate-200">
        <ItemTemplate
          watchValue={watchValue}
          index={index}
          parentIndex={parentIndex}
          control={control}
          nameIndex={nameIndex}
          moveItem={moveItem}
          remove={remove}
          isFirst={isFirst}
          isLast={isLast}
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
  remove: UseFieldArrayRemove
  isFirst: boolean
  isLast: boolean
  isNested?: boolean
}) => {
  const {
    watchValue,
    index,
    parentIndex,
    control,
    nameIndex,
    moveItem,
    remove,
    isFirst,
    isLast,
    isNested
  } = props
  const { setFocusedIndex, setValue, getValue } = useContext(FocusContext)
  const [confirmRemoveAtIndex, setConfirmRemoveAtIndex] = useState<number>(-1)

  const handleFocus = () => {
    if (parentIndex !== undefined) {
      setFocusedIndex(parentIndex)
    }
  }

  const handleMoveItemClicked = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: MoveItemDirection
  ) => {
    e.preventDefault()
    e.stopPropagation()
    moveItem(index, direction)
  }

  const initialEmoji = getValue(`${nameIndex}.icon`) as string
  const SysIcon = systemIcons.find(e => e.value === watchValue.value)?.icon

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-gray-600 border rounded-full shadow-sm">
            {isNested ? convertIndexToAlphabet(index) : index + 1}
          </div>

          <FormSwitch
            control={control}
            name={`${nameIndex}.available`}
            labelClassName="text-sm"
            size="smaller"
            tooltip={
              watchValue.enableNestedOptions
                ? `Disable this ${isNested ? 'nested' : ''} option`
                : `Enable this ${isNested ? 'nested' : ''} option`
            }
            controlComesFirst={true}
          />

          <div className="flex flex-row items-center gap-2">
            <TooltipThi content={`Move this ${isNested ? 'nested' : ''} option up`}>
              <Button
                disabled={isFirst}
                className="w-6 h-6"
                variant="ghost"
                size="icon"
                onClick={e => handleMoveItemClicked(e, 'up')}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </TooltipThi>

            <TooltipThi content={`Move this ${isNested ? 'nested' : ''} option down`}>
              <Button
                disabled={isLast}
                className="w-6 h-6"
                variant="ghost"
                size="icon"
                onClick={e => handleMoveItemClicked(e, 'down')}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </TooltipThi>

            {watchValue.system && <Badge className="bg-gray-500 hover:bg-gray-500">built-in</Badge>}
          </div>
        </div>

        {confirmRemoveAtIndex !== index && (
          <TooltipThi content={`Remove this ${isNested ? 'nested' : ''} option`}>
            <button className="group" type="button" onClick={() => setConfirmRemoveAtIndex(index)}>
              <Trash className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
          </TooltipThi>
        )}

        {confirmRemoveAtIndex === index && (
          <div className="flex items-center justify-center gap-2">
            <TooltipThi content="Confirm remove">
              <button
                className=""
                onClick={() => {
                  remove(index)
                  setConfirmRemoveAtIndex(-1)
                }}
              >
                <CircleCheck className="w-5 h-5 text-slate-700" />
              </button>
            </TooltipThi>
            <TooltipThi content="Cancel remove">
              <button className="" onClick={() => setConfirmRemoveAtIndex(-1)}>
                <CircleX className="w-5 h-5 text-slate-700" />
              </button>
            </TooltipThi>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-4 gap-x-6 md:flex-row md:items-center">
        {!watchValue.system && (
          <FormEmoji
            control={control}
            name={`${nameIndex}.icon`}
            initialValue={initialEmoji}
            setValue={setValue}
          />
        )}

        {watchValue.system && !!SysIcon && (
          <div className="flex flex-row items-center gap-3">
            Icon
            <div className="flex items-center justify-center w-8 h-8 bg-white border rounded-md">
              <SysIcon className="w-4 h-4 text-green-700" />
            </div>
          </div>
        )}

        <FormInput
          control={control}
          type="text"
          name={`${nameIndex}.displayName`}
          label="Disaply name"
          labelClassName="text-sm"
          placeholder="eg. Translate"
          className="w-full"
          wrap={false}
          onFocus={handleFocus}
          disabled={watchValue.system}
        />
      </div>

      {!isNested && !watchValue.system && (
        <FormSwitch
          control={control}
          name={`${nameIndex}.enableNestedOptions`}
          label={
            watchValue.enableNestedOptions
              ? "Nested options are enabled (parent's prompt is disabled)"
              : "Nested options are disabled (parent's prompt is required)"
          }
          labelClassName="text-sm"
          size="smaller"
          controlComesFirst={true}
        />
      )}

      {!watchValue.system && (
        <FormTextarea
          disabled={watchValue.enableNestedOptions}
          control={control}
          name={`${nameIndex}.prompt`}
          label="Prompt"
          labelClassName="text-sm"
          placeholder="eg. Translate the given text to English."
          className={cn('w-full', {
            hidden: watchValue.enableNestedOptions
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

type MoveItemDirection = 'up' | 'down'

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
