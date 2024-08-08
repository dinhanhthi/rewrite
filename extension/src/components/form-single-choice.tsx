import { Info } from 'lucide-react'
import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import TooltipThi from './ui/tooltip-thi'

type FormSingleChoiceProps = {
  control: Control<any, any>
  name: string
  data: { value: string; name: string; disabled?: boolean }[]
  label: string
  labelClassName?: string
  wrap?: boolean
  onChange?: (value: string) => void
}

export default function FormSingleChoice(props: FormSingleChoiceProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn('flex gap-4 space-y-0', {
            'flex-row': !props.wrap,
            'flex-col': props.wrap
          })}
        >
          <FormLabel className={cn('text-base', props.labelClassName)}>{props.label}</FormLabel>
          <FormControl>
            <RadioGroup
              {...field}
              onValueChange={e => {
                field.onChange(e)
                props.onChange?.(e)
              }}
              defaultValue={field.value}
              className="flex flex-row gap-6 m-0"
            >
              {props.data.map(e => (
                <FormItem
                  aria-disabled={e.disabled}
                  key={e.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem disabled={e.disabled} value={e.value} />
                  </FormControl>
                  <FormLabel className="!ml-2 font-normal flex items-center gap-2">
                    <span className={e.disabled ? 'opacity-60' : ''}>{e.name}</span>
                    {e.disabled && (
                      <TooltipThi content="not supported yet">
                        <Info size={16} className="text-slate-500" />
                      </TooltipThi>
                    )}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
