import { Download, SlidersHorizontal, Upload } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu'
import TooltipThi from '../components/ui/tooltip-thi'
import { Button } from '../components/ui/button'

export default function OptionsHeaderSettings() {
  const handleDownloadConfigs = () => {
    console.log('Download configs')
  }

  const handleUploadConfigs = () => {
    console.log('Upload configs')
  }

  return (
    <DropdownMenu>
      <TooltipThi content="Settings">
        <DropdownMenuTrigger asChild className='bg-none'>
          <Button size='icon' variant='ghost'>
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
      </TooltipThi>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDownloadConfigs()}>
          <Download className="mr-1.5 h-4 w-4" /> Export configs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUploadConfigs()}>
          <Upload className="mr-1.5 h-4 w-4" /> Import configs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
