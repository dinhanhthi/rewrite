import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export interface SingleChoiceType {
  name: string
  value: string
  available?: boolean
}

type FormSingleChoiceProps = {
  control: Control<any, any>
  name: string
  data: SingleChoiceType[]
  label: string
  labelClassName?: string
  wrap?: boolean
}

export default function FormSingleChoice(props: FormSingleChoiceProps) {
  const { control, name, data, label, labelClassName, wrap } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn('flex gap-4 space-y-0', {
            'flex-row': !wrap,
            'flex-col': wrap
          })}
        >
          <FormLabel className={cn('text-base', labelClassName)}>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row gap-6 m-0"
            >
              {data
                .filter(e => e.available)
                .map(e => (
                  <FormItem key={e.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem {...field} value={e.value} />
                    </FormControl>
                    <FormLabel className="!ml-2 font-normal">{e.name}</FormLabel>
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
