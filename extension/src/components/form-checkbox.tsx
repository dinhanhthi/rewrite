import React from 'react'
import { Control } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { Checkbox } from './ui/checkbox'

type FormCheckboxProps = {
  control: Control<any, any>
  name: string
  label?: string
  description?: string
}

export default function FormCheckbox(props: FormCheckboxProps) {
  const { control, name, label, description } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {(!!label || !!description) && (
            <div className="space-y-1 leading-none">
              {!!label && <FormLabel>{label}</FormLabel>}
              {!!description && <FormDescription>{description}</FormDescription>}
            </div>
          )}
        </FormItem>
      )}
    />
  )
}
