import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export interface SingleChoiceType {
  name: string
  value: string
  available?: boolean
}

type FormSingleChoiceProps = {
  form: UseFormReturn<any>
  name: string
  data: SingleChoiceType[]
  label: string
}

export default function FormSingleChoice(props: FormSingleChoiceProps) {
  const { form, name, data, label } = props
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-4 space-y-0">
          <FormLabel className="text-base">{label}</FormLabel>
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
                      <RadioGroupItem value={e.value} />
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
