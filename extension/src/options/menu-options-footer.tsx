import React from 'react'
import { Button } from '../components/ui/button'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { FormMenuOptions } from '../type'

type MenuOptionsFooterProps = {
  menuOptions: FormMenuOptions
  triggerAdd: boolean
  setTriggerAdd: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuOptionsFooter(props: MenuOptionsFooterProps) {
  return (
    <div className="flex flex-row items-center !justify-between w-full">
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => props.setTriggerAdd(trigger => !trigger)}
        >
          Add option
        </Button>
        <div className="w-8 h-8">
          <RewriteBtnWrapper
            options={props.menuOptions.options}
            preview={true}
            className="w-full border-none"
            btnClassName="text-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button onClick={() => props.setOpen(false)} variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="default" size="sm" onClick={() => props.onSubmit()}>
          Save
        </Button>
      </div>
    </div>
  )
}
