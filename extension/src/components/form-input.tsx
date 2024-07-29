import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

type FormInputProps = {
  form: UseFormReturn<any>
  name: string
  label?: string
  placeholder: string
  type?: string
}

export default function FormInput(props: FormInputProps) {
  const { form, name, label, placeholder, type = 'text' } = props
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-4 space-y-0">
          {label && <FormLabel className="text-base whitespace-nowrap">{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-row items-center w-full gap-2 flex-nowrap">
              <Input
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                onChange={field.onChange}
                value={field.value}
                className='flex-1 min-w-0'
              />
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-gray-600"
                >
                  {!showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
