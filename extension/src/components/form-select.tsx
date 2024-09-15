import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type FormSelectProps = {
  control: Control<any, any>
  name: string
  data: { value: string; name: string }[]
  label: string
  placeholder?: string
  labelClassName?: string
  wrap?: boolean
  description?: string
  triggerClassName?: string
  onValueChange?: (value: string) => void
}

export default function FormSelect(props: FormSelectProps) {
  return (
    <FormField
      defaultValue={props.data?.[0]?.value}
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn('flex gap-4 space-y-0', {
            'flex-row items-center': !props.wrap,
            'flex-col': props.wrap
          })}
        >
          <FormLabel className={cn('text-base whitespace-nowrap', props.labelClassName)}>
            {props.label}
          </FormLabel>
          <Select
            onValueChange={val => {
              field.onChange(val)
              props.onValueChange?.(val)
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger {...field} value={field.value} className={props.triggerClassName}>
                <SelectValue placeholder={props.placeholder ?? 'Select a value'} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.data.map(e => (
                <SelectItem key={e.value} value={e.value}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
