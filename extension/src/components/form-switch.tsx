import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { Switch, SwitchSize } from './ui/switch'
import TooltipThi from './ui/tooltip-thi'

type FormSwitchProps = {
  className?: string
  control: Control<any, any>
  name: string
  label?: string
  labelClassName?: string
  description?: string
  size?: SwitchSize
  tooltip?: string
  controlComesFirst?: boolean
}

export default function FormSwitch(props: FormSwitchProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-1', props.className)}>
          <TooltipThi content={props.tooltip}>
            <div
              className={cn('flex items-center gap-3', {
                'flex-row-reverse justify-end': props.controlComesFirst
              })}
            >
              {!!props.label && (
                <FormLabel className={cn('text-base', props.labelClassName)}>
                  {props.label}
                </FormLabel>
              )}
              <FormControl>
                <Switch
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  size={props.size ?? 'default'}
                />
              </FormControl>
            </div>
          </TooltipThi>
          {!!props.description && <FormDescription>{props.description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
