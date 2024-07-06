import cn from 'classnames'
import React, { useEffect } from 'react'

import { House } from 'lucide-react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Toaster } from '../components/ui/toaster'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import '../styles/global.scss'
import '../styles/options.scss'
import '../styles/playground.scss'
import '../styles/popup.scss'
import '../styles/tailwind.scss'
import CancelDialogPlayground from './components/CancelDialogPlayground'
import Logo from './components/Logo'
import NotionMenuBar from './components/NotionMenuBar'
import NotionPopoverMenu from './components/NotionPopoverMenu'
import OptionsPlayground from './components/OptionsPlayground'
import PopupPlayground from './components/PopupPlayground'
import RewriteEditorPlayground from './components/RewriteEditorPlayground'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = `Playground for Rewrite!`
  }, [])

  return (
    <>
      <div className="flex flex-col w-screen h-screen notion-font-family">
        <div
          className={cn(
            'flex flex-row flex-wrap items-center justify-center gap-[1em] py-[1em] px-8 bg-sky-100'
          )}
        >
          {menus.map(menu => (
            <TooltipProvider
              delayDuration={100}
              skipDelayDuration={10}
              disableHoverableContent={true}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    className={cn('cursor-pointer', {
                      'bg-sky-500 text-white hover:bg-sky-500 hover:text-white': location.pathname === menu.path,
                      'bg-white text-slate-800': location.pathname !== menu.path
                    })}
                    key={menu.name}
                    variant="outline"
                  >
                    <Link
                      className="tracking-wide text-[1em] gap-[0.3em] !py-1 !px-3 h-auto font-normal rounded-3xl"
                      to={menu.path}
                    >
                      {menu.name === 'home' && <House size={20} />}
                      {menu.name}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {menu.description && (
                  <TooltipContent className="text-[12px] text-white bg-black px-1.5 py-1">
                    {menu.description}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center flex-auto gap-16">
          {location.pathname === '/' && (
            <div className="flex items-start justify-center h-full gap-2 py-8 text-3xl">
              <div className="animate-bounce">☝ </div>
              <div className="text-pink-600">Select a component</div>
            </div>
          )}
          {location.key === 'default' && <Navigate to="/" />}
          <Routes>
            {menus.map(menu => (
              <Route
                key={menu.name}
                path={menu.path}
                element={<menu.component {...menu.props} />}
              />
            ))}
          </Routes>
        </div>
      </div>
      <div className="dinhanhthi rewrite-overlay"></div>
      <Toaster />
    </>
  )
}

const menus: {
  name: string
  path: string
  description?: string
  component: React.FC<any>
  props?: any
}[] = [
  {
    name: 'home',
    path: '/',
    component: () => <div />,
    props: {}
  },
  {
    name: 'logo',
    path: '/logo',
    component: Logo,
    props: {}
  },
  {
    name: 'notionMenu',
    path: '/notionMenu',
    description: 'When we select text in Notion.',
    component: NotionMenuBar,
    props: {}
  },
  {
    name: 'notionPopover',
    path: '/notionPopover',
    description: 'When we select blocks or click "..." on the menu.',
    component: NotionPopoverMenu,
    props: {}
  },
  {
    name: 'RewriteEditor',
    path: '/RewriteEditor',
    component: RewriteEditorPlayground,
    props: {}
  },
  {
    name: 'CancelDialog',
    path: '/CancelDialog',
    description: 'When we click outside the editor.',
    component: CancelDialogPlayground,
    props: {}
  },
  {
    name: 'popup',
    path: '/popup',
    component: PopupPlayground
  },
  {
    name: 'options',
    path: '/options',
    component: OptionsPlayground
  }
]
