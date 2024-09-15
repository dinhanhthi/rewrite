import React, { useEffect, useRef } from 'react'

type IframeWithInputProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  onSubmit: () => void
}

export default function IframeWithInput(props: IframeWithInputProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'submit') {
        props.onSubmit()
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [props.onSubmit])

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument
      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';">
            <title>Iframe</title>
          </head>
          <body>
            <style>
              body,
              html {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
              }
              #iframeInput {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border: none;
                padding: 0;
                margin: 0;
                font-family: inherit;
                font-size: 95%;
                background-color: transparent;
                outline: none;
                color: #555;
              }
              input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px white inset;
                box-shadow: 0 0 0px 1000px white inset;
                -webkit-text-fill-color: #000;
              }
            </style>

            <input id="iframeInput" type="text" autocomplete="off" placeholder="${props.placeholder || 'type some text...'}" />
          </body>
          </html>
        `)
        iframeDoc.close()

        // Add event listener to capture input value
        const inputElement = iframeDoc.getElementById('iframeInput') as HTMLInputElement
        if (inputElement) {
          inputElement.addEventListener('input', event => {
            const target = event.target as HTMLInputElement
            props.setValue(target.value)
          })

          inputElement.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
              window.parent.postMessage({ type: 'submit' }, '*')
            }
          })

          inputElement.focus()
        }
      }
    }
  }, [])

  return <iframe ref={iframeRef} style={{ width: '100%', height: '18px', border: 'none' }} />
}
