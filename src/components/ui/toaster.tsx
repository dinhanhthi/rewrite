'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/src/components/ui/toast'
import { useToast } from '@/src/components/ui/use-toast'
import React from 'react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={2000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className='p-4 text-white bg-slate-800'>
            <div className="grid gap-1">
              {title && <ToastTitle className='text-base'>{title}</ToastTitle>}
              {description && <ToastDescription className='text-base'>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
