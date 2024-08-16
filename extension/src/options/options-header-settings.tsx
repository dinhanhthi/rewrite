import { Download, SlidersHorizontal, Upload } from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'
import TooltipThi from '../components/ui/tooltip-thi'
import { FormSettings } from '../type'

type OptionsHeaderSettingsProps = {
  settings: FormSettings
  setSettings: (settings: FormSettings) => void
}

export default function OptionsHeaderSettings(props: OptionsHeaderSettingsProps) {
  const handleDownloadConfigs = () => {
    const configs = { settings: props.settings }
    const configsJson = JSON.stringify(configs, null, 2)
    const blob = new Blob([configsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'rewrite-configs.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleUploadConfigs = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = readerEvent => {
          const configs = JSON.parse(readerEvent.target?.result as string)
          const settings = configs.settings
          if (settings) {
            props.setSettings(settings)
          }
          window.location.reload()
        }
      }
    }
    input.click()
  }

  return (
    <DropdownMenu>
      <TooltipThi content="Settings">
        <DropdownMenuTrigger asChild={true} className="bg-none">
          <Button size="icon" variant="ghost">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
      </TooltipThi>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDownloadConfigs()}>
          <Download className="mr-1.5 h-4 w-4" /> Donwload settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUploadConfigs()}>
          <Upload className="mr-1.5 h-4 w-4" /> Upload settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
