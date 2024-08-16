import React from 'react'
import { defaultMenuOptionsForm } from '../../config'
import useLocalStorage from '../../helpers/hooks/use-local-storage'
import MenuOptionsForm from '../../options/menu-options-form'
import { FormMenuOptions } from '../../type'

export default function MenuOptionsFormPlayground() {
  const [menuOptions, setMenuOptions] = useLocalStorage<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#aaa]">
      <div className="max-h-[min(90%,600px)] w-full max-w-[min(95%,768px)] bg-white overflow-hidden flex flex-col p-4 rounded-md">
        <MenuOptionsForm menuOptions={menuOptions} setMenuOptions={setMenuOptions} />
      </div>
    </div>
  )
}
