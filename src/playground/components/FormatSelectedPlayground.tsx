import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { formatSelectedText } from '../../helpers/helpers'

export default function FormatSelectedPlayground() {
  const defaultType = 'formated text'
  const [inputText, setInputText] = React.useState(
    types.find(type => type.name === defaultType)!.html
  )

  const handleOnSelectChange = (value: string) => {
    setInputText(types.find(type => type.name === value)!.html)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div className="flex flex-row w-full h-full gap-4 p-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="w-fit">
          <Select defaultValue={defaultType} onValueChange={handleOnSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {types.map((type, index) => (
                  <SelectItem className="" key={index} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            className="flex-1"
            placeholder="Type your message here."
          />
          <div className="text-sm">
            ☝{' '}
            <span className="italic">That's what looks like after we select text in Notion.</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full h-full gap-8">
        <div className="flex flex-col flex-1 w-full gap-2">
          <div>Styled</div>
          <div
            className="flex-1 p-4 border rounded-md"
            contentEditable={true}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{ __html: inputText }}
          ></div>
        </div>
        <div className="flex flex-col flex-1 w-full gap-2">
          <div>Formatted</div>
          <Textarea
            value={formatSelectedText(inputText)}
            className="flex-1 dat-scrollbar dat-scrollbar-small"
            placeholder="Type your message here."
          />
        </div>
      </div>
    </div>
  )
}

const types: {
  name: string
  html: string
}[] = [
  {
    name: 'ol',
    html: '<div style="display: flex; align-items: flex-start; width: 100%; padding-left: 2px; color: inherit; fill: inherit;"><div contenteditable="false" class="pseudoSelection" data-content-editable-void="true" data-text-edit-side="start" style="user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: unset; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 6px);"><span class="pseudoBefore" style="--pseudoBefore--content: &quot;1.&quot;; width: 24px; text-align: center; white-space: nowrap;"></span></div><div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column;"><div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder="List" data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px; text-align: left;" contenteditable="true">Thu nghiem</div><div style="position: relative; left: 0px;"></div></div><div data-block-id="a2f8f3c6-9c10-47d4-b52f-3dd251069a1f" class="notion-selectable notion-numbered_list-block"></div></div></div><div style="display: flex; align-items: flex-start; width: 100%; padding-left: 2px; color: inherit; fill: inherit;"><div contenteditable="false" class="pseudoSelection" data-content-editable-void="true" data-text-edit-side="start" style="user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: unset; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 6px);"><span class="pseudoBefore" style="--pseudoBefore--content: &quot;2.&quot;; width: 24px; text-align: center; white-space: nowrap;"></span></div><div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column;"><div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder="List" data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px; text-align: left;" contenteditable="true">Item</div><div style="position: relative; left: 0px;"></div></div><div data-block-id="5641e40d-a025-457b-b35b-cf5c14a73c02" class="notion-selectable notion-numbered_list-block"></div></div></div>'
  },
  {
    name: 'ul',
    html: '<div style="display: flex; align-items: flex-start; width: 100%; padding-left: 2px; color: inherit; fill: inherit;"><div contenteditable="false" class="pseudoSelection" data-content-editable-void="true" data-text-edit-side="start" style="user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: 24px; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 6px);"><div class="pseudoBefore" style="font-size: 1.5em; line-height: 1; margin-bottom: 0px; --pseudoBefore--fontFamily: Arial; --pseudoBefore--content: &quot;•&quot;;"></div></div><div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column;"><div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder="List" data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px; text-align: left;" contenteditable="true">Item 1</div><div style="position: relative; left: 0px;"></div></div><div data-block-id="a641a285-db52-4f35-9fa8-448d78ad040b" class="notion-selectable notion-bulleted_list-block"></div></div></div><div style="display: flex; align-items: flex-start; width: 100%; padding-left: 2px; color: inherit; fill: inherit;"><div contenteditable="false" class="pseudoSelection" data-content-editable-void="true" data-text-edit-side="start" style="user-select: none; --pseudoSelection--background: transparent; margin-right: 2px; width: 24px; display: flex; align-items: center; justify-content: center; flex-grow: 0; flex-shrink: 0; min-height: calc(1.5em + 6px);"><div class="pseudoBefore" style="font-size: 1.5em; line-height: 1; margin-bottom: 0px; --pseudoBefore--fontFamily: Arial; --pseudoBefore--content: &quot;•&quot;;"></div></div><div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column;"><div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder="List" data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px; text-align: left;" contenteditable="true">Item 2</div><div style="position: relative; left: 0px;"></div></div><div data-block-id="18c0c8fb-c1f2-4b5b-9519-ed8625f58cd1" class="notion-selectable notion-bulleted_list-block"></div></div></div>'
  },
  {
    name: 'formated text',
    html: '<span style="font-weight:600" data-token-index="1" class="notion-enable-hover">bold</span> and <span style="font-style:italic" data-token-index="3" class="notion-enable-hover">italic</span> and also <span style="color:inherit;border-bottom:0.05em solid;word-wrap:break-word" data-token-index="5" class="notion-enable-hover">underline</span> and <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="7" spellcheck="false" class="notion-enable-hover">code</span> and also <span style="text-decoration:line-through" data-token-index="9" class="notion-enable-hover">strikethrough</span>. We can also test with <span style="color:inherit;border-bottom:0.05em solid;word-wrap:break-word;text-decoration:line-through;font-style:italic;font-weight:600" data-token-index="11" class="notion-enable-hover">combind all of them</span>'
  },
  { name: 'plain text', html: 'This is plain text without any formated' },
  {
    name: 'code',
    html: `<div style="display: flex;"><div contenteditable="false" data-content-editable-void="true" role="figure" aria-labelledby=":r41:" style="flex-grow: 1; border-radius: 4px; text-align: left; position: relative; background: rgb(247, 246, 243); min-width: 0px; width: 100%;"><div style="position: absolute; top: 8px; left: 8px; z-index: 1; color: rgba(55, 53, 47, 0.65); display: flex; align-items: center; justify-content: flex-end; opacity: 0; transition: opacity 300ms ease-in 0s;"><div role="button" tabindex="0" style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-flex; align-items: center; white-space: nowrap; height: 20px; border-radius: 4px; font-size: 12px; line-height: 1.2; padding-left: 5px; padding-right: 5px; color: rgba(55, 53, 47, 0.65); margin-right: 5px;">SQL<svg role="graphics-symbol" viewBox="0 0 30 30" class="chevronDown" style="width: 10px; height: 100%; display: block; fill: rgba(55, 53, 47, 0.35); flex-shrink: 0; margin-left: 4px;"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg></div></div><div style="position: absolute; top: 3px; right: 1px; z-index: 1; color: rgba(55, 53, 47, 0.65); display: flex; align-items: center; justify-content: flex-end; height: 25px; font-size: 11.5px; opacity: 0; transition: opacity 300ms ease-in 0s;"><div style="color: rgba(55, 53, 47, 0.65); display: flex; align-items: center; justify-content: center; font-size: 12px; margin-top: 4px; margin-right: 4px;"><div role="button" tabindex="0" style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-flex; align-items: center; white-space: nowrap; height: 25px; border-radius: 4px 0px 0px 4px; font-size: 11.5px; line-height: 1.2; padding: 4px 6px; color: rgb(55, 53, 47); background: rgb(234, 233, 229); font-weight: 400;"><svg role="graphics-symbol" viewBox="0 0 14 16" class="copy" style="width: 16px; height: 16px; display: block; fill: inherit; flex-shrink: 0; padding-right: 4px;"><path d="M2.404 15.322h5.701c1.26 0 1.887-.662 1.887-1.927V12.38h1.154c1.254 0 1.91-.662 1.91-1.928V5.555c0-.774-.158-1.266-.626-1.74L9.512.837C9.066.387 8.545.21 7.865.21H5.463c-1.254 0-1.91.662-1.91 1.928v1.084H2.404c-1.254 0-1.91.668-1.91 1.933v8.239c0 1.265.656 1.927 1.91 1.927zm7.588-6.62c0-.792-.1-1.161-.592-1.665L6.225 3.814c-.452-.462-.844-.58-1.5-.591V2.215c0-.533.28-.832.843-.832h2.38v2.883c0 .726.386 1.113 1.107 1.113h2.83v4.998c0 .539-.276.832-.844.832H9.992V8.701zm-.79-4.29c-.206 0-.288-.088-.288-.287V1.594l2.771 2.818H9.201zM2.503 14.15c-.563 0-.844-.293-.844-.832V5.232c0-.539.281-.837.85-.837h1.91v3.187c0 .85.416 1.26 1.26 1.26h3.14v4.476c0 .54-.28.832-.843.832H2.504zM5.79 7.816c-.24 0-.346-.105-.346-.345V4.547l3.223 3.27H5.791z"></path></svg>Copy</div><div role="button" tabindex="0" style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-flex; align-items: center; white-space: nowrap; height: 25px; border-radius: 0px; font-size: 11.5px; line-height: 1.2; padding: 4px 6px; color: rgb(55, 53, 47); background: rgb(234, 233, 229); font-weight: 400; margin-left: 1px; margin-right: 1px;">Caption</div><div role="button" tabindex="0" style="user-select: none; transition: opacity 200ms ease-in 0s; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 26px; height: 25px; fill: rgba(55, 53, 47, 0.45); background: rgb(234, 233, 229); border-top-left-radius: 0px; border-bottom-left-radius: 0px; padding-left: 8px; padding-right: 8px;"><svg role="graphics-symbol" viewBox="0 0 16 16" class="ellipsis" style="width: 16px; height: 16px; display: block; fill: inherit; flex-shrink: 0;"><path d="M2.887 9.014c.273 0 .52-.064.738-.192.219-.132.394-.307.526-.526.133-.219.199-.46.199-.725 0-.405-.142-.747-.424-1.025a1.41 1.41 0 00-1.04-.417c-.264 0-.505.066-.724.198a1.412 1.412 0 00-.718 1.244c0 .265.064.506.192.725.132.219.307.394.526.526.219.128.46.192.725.192zm5.113 0a1.412 1.412 0 001.244-.718c.132-.219.198-.46.198-.725 0-.405-.14-.747-.423-1.025A1.386 1.386 0 008 6.129c-.264 0-.506.066-.725.198a1.412 1.412 0 00-.718 1.244c0 .265.064.506.192.725.132.219.308.394.526.526.22.128.46.192.725.192zm5.106 0c.265 0 .506-.064.725-.192.219-.132.394-.307.526-.526.133-.219.199-.46.199-.725 0-.405-.142-.747-.424-1.025a1.394 1.394 0 00-1.026-.417 1.474 1.474 0 00-1.265.718c-.127.218-.19.46-.19.724 0 .265.063.506.19.725.133.219.308.394.527.526.223.128.47.192.738.192z"></path></svg></div></div></div><div><div class="line-numbers notion-code-block" style="display: flex; overflow-x: auto;"><div class="notranslate" spellcheck="false" autocorrect="off" autocapitalize="off" placeholder=" " data-content-editable-leaf="true" contenteditable="true" style="flex-grow: 1; flex-shrink: 1; text-align: left; font-family: SFMono-Regular, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace; font-size: 85%; tab-size: 2; padding: 34px 16px 32px 32px; min-height: 1em; color: rgb(55, 53, 47); white-space: pre;"><span class="token keyword" data-token-index="0">CREATE</span><span class="" data-token-index="0"> EXTENSION vector</span><span class="token punctuation" data-token-index="0">;</span><span>
</span></div></div></div><div style="background: white; padding-right: 105px;"></div></div><div style="position: relative; left: 0px;"></div>​</div>`
  },
  {
    name: 'multiple paragraphs',
    html: '<div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder=" " data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;" contenteditable="true">I want to test the keeping forThu nghiem <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">null</span> xem <span style="font-weight:600" data-token-index="3" class="notion-enable-hover">the nao</span> nhe <span style="text-decoration:line-through" data-token-index="5" class="notion-enable-hover">bi cat</span> con day la highlight!<span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="7" spellcheck="false" class="notion-enable-hover">e</span> should be kept. The <span style="background:rgba(251, 243, 219, 1)" data-token-index="9" class="notion-enable-hover">highlight</span> is kept too? Maybe, <span style="color:rgba(212, 76, 71, 1);fill:rgba(212, 76, 71, 1)" data-token-index="11" class="notion-enable-hover">text color</span> is different.I want to test the keeping format of Notion, focreateRewriteEditor</div><div style="position: relative; left: 0px;"></div></div><div style="display: flex;"><div class="notranslate" spellcheck="true" placeholder=" " data-content-editable-leaf="true" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;" contenteditable="true">I want to test the keeping forThu nghiem <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="1" spellcheck="false" class="notion-enable-hover">null</span> xem <span style="font-weight:600" data-token-index="3" class="notion-enable-hover">the nao</span> nhe <span style="text-decoration:line-through" data-token-index="5" class="notion-enable-hover">bi cat</span> con day la highlight!<span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="7" spellcheck="false" class="notion-enable-hover">e</span> should be kept. The <span style="background:rgba(251, 243, 219, 1)" data-token-index="9" class="notion-enable-hover">highlight</span> is kept too? Maybe, <span style="color:rgba(212, 76, 71, 1);fill:rgba(212, 76, 71, 1)" data-token-index="11" class="notion-enable-hover">text color</span> is different.I want to test the keeping format of Notion, focreateRewriteEditor</div><div style="position: relative; left: 0px;"></div></div>'
  }
]
