import React from 'react'
import { Control } from 'react-hook-form'
import { Checkbox } from './ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'

type FormCheckboxProps = {
  control: Control<any, any>
  name: string
  label?: string
  description?: string
}

export default function FormCheckbox(props: FormCheckboxProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start">
          <FormControl>
            <Checkbox {...field} checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {(!!props.label || !!props.description) && (
            <div className="space-y-1 leading-none">
              {!!props.label && <FormLabel>{props.label}</FormLabel>}
              {!!props.description && <FormDescription>{props.description}</FormDescription>}
            </div>
          )}
        </FormItem>
      )}
    />
  )
}
