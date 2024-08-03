import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import React, { useState } from 'react'
import { Control } from 'react-hook-form'
import { Button } from './ui/button'
import { FormField } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type FormEmojiProps = {
  control: Control<any, any>
  name: any
  setValue?: any
  className?: string
  initialValue?: string
}

export default function FormEmoji(props: FormEmojiProps) {
  const { control, name, setValue, initialValue } = props
  const [selectedEmoji, setSelectedEmoji] = useState(initialValue || '😀')

  const onSelect = (emoji: any) => {
    setValue(name, emoji.native, { shouldValidate: true, shouldDirty: true })
    setSelectedEmoji(emoji.native)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        return (
          <Popover>
            <div className='flex flex-row items-center gap-3'>
              Icon
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className='w-8 h-8 p-0'>
                  {selectedEmoji}
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="p-0 overflow-hidden w-fit">
              <Picker
                data={data}
                onEmojiSelect={onSelect}
                previewPosition="none"
                emojiButtonSize={34}
                emojiSize={22}
                perLine={8}
                maxFrequentRows={1}
              />
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}
