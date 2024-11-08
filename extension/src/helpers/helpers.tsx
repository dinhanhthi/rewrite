/**
 * JS helpers used for both browser and playground
 * DON'T include any browser only code here, use helpersBrowser.ts for that
 */

import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { clsx, type ClassValue } from 'clsx'
import OpenAI from 'openai'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { twMerge } from 'tailwind-merge'
import CustomPromptEditor from '../components/custom-prompt-editor'
import RewriteEditor from '../components/rewrite-editor'
import { toast } from '../components/ui/use-toast'
import { EDITOR_MAX_HEIGHT, EDITOR_MAX_HEIGHT_ADAPTIVE } from '../config'
import { RewriteCtx, RewriteCtxType, TalkToBackgroundFunc } from '../content-script/rewrite-ctx'
import { FormMenuOptions, FormSettings, Service } from '../type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decorateSelected() {
  decorateSelectedText()
  decorateSelectedBlocks()
}

/**
 * Decorate the selected text by using the CSS Highlight API
 */
function decorateSelectedText() {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) return
  const range = selection.getRangeAt(0)
  const highlight = new Highlight(range)
  CSS.highlights.set('rewrite-highlight', highlight)
}

/**
 * When user select blocks
 */
function decorateSelectedBlocks() {
  const selectedDivs = document.querySelectorAll('div.notion-selectable-halo')
  if (selectedDivs.length > 0) {
    const range = new Range()
    const prevSiblingOfFirst = selectedDivs[0].previousElementSibling || selectedDivs[0]
    range.setStartBefore(prevSiblingOfFirst)
    range.setEndAfter(selectedDivs[selectedDivs.length - 1])
    const highlight = new Highlight(range)
    CSS.highlights.set('rewrite-highlight', highlight)
  }
}

export function createCustomPromptEditor(props: {
  selectedText: string
  talkToBackground?: TalkToBackgroundFunc
  settings?: FormSettings
  endContainer?: HTMLElement | null // for adaptive position
  range?: Range | null
}) {
  removeAllCustomPromptEditors()

  if (props.endContainer) {
    const pos = {
      top: props.endContainer.offsetTop + props.endContainer.offsetHeight + 4,
      left: props.endContainer.offsetLeft,
      width: props.endContainer.offsetWidth
    }
    const scroller = props.endContainer.closest('.notion-scroller.vertical') as HTMLElement
    if (scroller) {
      const editor = document.createElement('div')
      editor.classList.add('dinhanhthi')
      editor.id = 'custom-prompt-editor'
      editor.style.position = 'absolute'
      editor.style.top = pos.top + 'px'
      editor.style.left = pos.left + 'px'
      editor.style.width = pos.width + 'px'
      editor.style.height = 'auto'
      editor.style.zIndex = '1000'
      scroller.appendChild(editor)
      const root = createRoot(editor)
      const editorHeight = 50
      root.render(
        <RewriteCtx.Provider
          value={{
            selectedText: props.selectedText,
            mode: 'browser',
            talkToBackground: props.talkToBackground,
            settings: props.settings,
            range: props.range
          }}
        >
          <CustomPromptEditor mode="browser" />
        </RewriteCtx.Provider>
      )

      /**
       * We don't use `rect.bottom` because the editor isn't rendered yet, instead we use
       * `rect.top + editorHeight`
       */
      const rect = editor.getBoundingClientRect()
      const isEditorInViewport =
        rect.top >= 0 &&
        rect.top + editorHeight <= (window.innerHeight || document.documentElement.clientHeight)
      if (!isEditorInViewport) {
        scroller.scrollTo({
          top: scroller.scrollTop + editorHeight + 10,
          behavior: 'smooth'
        })
      }
    }
  }
}

export function createRewriteEditor(props: {
  content?: string
  talkToBackground?: TalkToBackgroundFunc
  settings?: FormSettings
  menuOptions?: FormMenuOptions
  endContainer?: HTMLElement | null // for adaptive position
  range?: Range | null
}) {
  removeAllRewriteEditors()

  if (props.endContainer) {
    const pos = props.settings?.adaptivePosition
      ? {
          top: props.endContainer.offsetTop + props.endContainer.offsetHeight + 4,
          left: props.endContainer.offsetLeft,
          width: props.endContainer.offsetWidth
        }
      : {
          bottom: 30, // for notion first
          right: 80 // for notion first
        }
    const scroller = props.endContainer.closest('.notion-scroller.vertical') as HTMLElement
    if (scroller) {
      const editor = document.createElement('div')
      editor.classList.add('dinhanhthi')
      editor.id = 'rewrite-editor'
      editor.style.position = props.settings?.adaptivePosition ? 'absolute' : 'fixed'
      if (props.settings?.adaptivePosition) {
        editor.style.top = pos.top + 'px'
        editor.style.left = pos.left + 'px'
        editor.style.width = pos.width + 'px'
      } else {
        editor.style.bottom = pos.bottom + 'px'
        editor.style.right = pos.right + 'px'
        editor.style.width = 'max(400px, 50%)'
      }
      editor.style.height = 'auto'
      editor.style.zIndex = '1000'
      scroller.appendChild(editor)
      const root = createRoot(editor)
      const editorHeight = props.settings?.adaptivePosition
        ? EDITOR_MAX_HEIGHT_ADAPTIVE
        : EDITOR_MAX_HEIGHT
      root.render(
        <RewriteEditor
          mode="browser"
          maxHeight={editorHeight}
          content={props.content}
          talkToBackground={props.talkToBackground}
          range={props.range}
        />
      )

      /**
       * We don't use `rect.bottom` because the editor isn't rendered yet, instead we use
       * `rect.top + editorHeight`
       */
      const rect = editor.getBoundingClientRect()
      const isEditorInViewport =
        rect.top >= 0 &&
        rect.top + editorHeight <= (window.innerHeight || document.documentElement.clientHeight)
      if (!isEditorInViewport) {
        scroller.scrollTo({
          top: scroller.scrollTop + editorHeight + 10,
          behavior: 'smooth'
        })
      }
    }
  }
}

export function removeAllRewriteEditors() {
  const editors = document.querySelectorAll('#rewrite-editor')
  editors.forEach(editor => editor.remove())
}

export function removeAllCustomPromptEditors() {
  const editors = document.querySelectorAll('#custom-prompt-editor')
  editors.forEach(editor => editor.remove())
}

export function generateAPIKeyPlaceholder(service: Service): string {
  const prefix = 'Example: '
  switch (service) {
    case 'openai':
    default:
      return prefix + 'sk-xxx...xxx'
    case 'mistral':
      return prefix + '1bx...w0'
    case 'claude':
      return prefix + 'sk-ant-api-xxx...xxx'
    case 'gemini':
      return prefix + 'AIza...xxx'
  }
}

export function generateTranslatePrompt(language: string) {
  return 'Translate the given text into ' + language
}

/**
 * Validate the given API key for the given service and model
 */
export async function validateApiKey(service: Service, apiKey: string, model: string) {
  try {
    switch (service) {
      case 'openai':
      default: {
        try {
          const openAI = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
          await openAI.chat.completions.create({
            model,
            messages: [{ role: 'user', content: 'Hello' }]
          })
          return true
        } catch (error) {
          // console.error(error)
          return false
        }
      }

      // TODO: wait for Claude to allow use their APIs via browser-like client (CORS issue)
      // OR: implement it via nextjs server
      case 'mistral': {
        return true
      }

      case 'claude': {
        const claudeApi = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
        await claudeApi.messages.create({
          model,
          max_tokens: 1024,
          messages: [{ role: 'user', content: 'Hello?' }]
        })
        return true
      }

      case 'gemini': {
        const genAI = new GoogleGenerativeAI(apiKey)
        const mdl = genAI.getGenerativeModel({ model })
        await mdl.generateContent({
          contents: [{ role: 'user', parts: [{ text: 'Hello, who are you?' }] }]
        })
        return true
      }
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Handle the prompt and text to get the response from the service
 *
 * @param settings FormSettings
 * @param prompt string - The system prompt (eg. Translate the given text into Vietnamese)
 * @param text string - The text to be processed
 */
export async function handlePrompt(settings: FormSettings, prompt: string) {
  const systemPrompt =
    'You are a writing assistant. If the user asks you to modify or transform the text and in this text, there is html tag like <b>text</b> or <i> or similar things, keep these formatting in the transformed result.'

  switch (settings.service) {
    case 'openai':
    default: {
      const openAI = new OpenAI({ apiKey: settings.apiKey, dangerouslyAllowBrowser: true })
      const completion = await openAI.chat.completions.create({
        model: settings.model,
        messages: [
          {
            role: 'assistant',
            content: systemPrompt
          },
          { role: 'user', content: prompt }
        ],
        stream:
          settings.model === 'o1-preview' || settings.model === 'o1-mini' ? false : settings.stream
      })
      return completion
    }

    case 'gemini': {
      const genAI = new GoogleGenerativeAI(settings.apiKey)
      const model = genAI.getGenerativeModel({ model: settings.model })
      let completion: any
      const request = {
        systemInstruction: systemPrompt,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      }
      if (!settings.stream) {
        completion = (await model.generateContent(request)).response
      } else {
        completion = (await model.generateContentStream(request)).stream
      }
      return completion
    }

    case 'claude': {
      const claudeApi = new Anthropic({ apiKey: settings.apiKey, dangerouslyAllowBrowser: true })
      const completion = await claudeApi.messages.create({
        model: settings.model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
        stream: settings.stream
      })
      return completion
    }
  }
}

export function buildFinalPrompt(system: string, text: string): string {
  return `${system}:\n${text}`
}

export const handleMenuItemClicked = async (ctx: RewriteCtxType, sysPrompt: string) => {
  if (ctx.mode === 'browser') {
    const content = buildFinalPrompt(sysPrompt, ctx.selectedText)
    createRewriteEditor({
      content,
      talkToBackground: ctx.talkToBackground,
      settings: ctx.settings,
      menuOptions: ctx.menuOptions,
      endContainer: ctx.endContainer,
      range: ctx.range
    })
  } else {
    toast({ description: `Menu item clicked` })
  }
}
