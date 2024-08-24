import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../components/ui/alert-dialog'
import { Button } from '../components/ui/button'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { FormMenuOptions } from '../type'

type MenuOptionsFooterProps = {
  saveDisabled?: boolean
  menuOptions: FormMenuOptions
  triggerAdd?: number
  setTriggerAdd: React.Dispatch<React.SetStateAction<number>>
  onSubmit: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onReset: () => void
}

export default function MenuOptionsFooter(props: MenuOptionsFooterProps) {
  return (
    <div className="flex flex-row items-center !justify-between w-full">
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => props.setTriggerAdd(triggered => triggered + 1)}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" size="sm">
              Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset the option menu to the default</AlertDialogTitle>
              <AlertDialogDescription>🚨 This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => props.onReset()}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          disabled={props.saveDisabled}
          variant="default"
          size="sm"
          onClick={() => props.onSubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
