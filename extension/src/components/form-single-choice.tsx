import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Settings, SettingsKeys } from '../type'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type FormSingleChoiceProps = {
  data: any[]
  labelText?: string
  subLabelText?: string
  formName: SettingsKeys
  control: Control<Settings, any>
  defaultValue?: any
}

export default function FormSingleChoice(props: FormSingleChoiceProps) {
  return (
    <Controller
      control={props.control}
      defaultValue={props.defaultValue}
      name={props.formName}
      render={({ field }) => (
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <label htmlFor="r1">Default</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <label htmlFor="r2">Comfortable</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <label htmlFor="r3">Compact</label>
          </div>
        </RadioGroup>
      )}
    />
  )
}
