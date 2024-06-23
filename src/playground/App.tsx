import cn from 'classnames'
import React, { useEffect } from 'react'

import { House } from 'lucide-react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import '../styles/global.scss'
import '../styles/options.scss'
import '../styles/playground.scss'
import '../styles/popup.scss'
import '../styles/tailwind.scss'
import NotionMenuBar from './components/NotionMenuBar'
import OptionsPlayground from './components/OptionsPlayground'
import PopupPlayground from './components/PopupPlayground'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = `Playground for Rewrite it!`
  }, [])

  return (
    <div className="flex flex-col w-screen h-screen notion-font-family">
      <div
        className={cn(
          'flex flex-row flex-wrap items-center justify-center gap-[1em] p-[1em] bg-slate-200'
        )}
      >
        {menus.map(menu => (
          <Link
            key={menu.name}
            className={cn(
              'rounded-[0.5em] text-[1em] px-[1em] py-[0.25em] hover:text-sky-800',
              'flex items-center justify-center gap-[0.3em]',
              {
                'bg-sky-500 text-white pointer-events-none': location.pathname === menu.path,
                'bg-white text-slate-800': location.pathname !== menu.path
              }
            )}
            to={menu.path}
          >
            {menu.name === 'home' && <House size={20} />}
            {menu.name}
          </Link>
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
            <Route key={menu.name} path={menu.path} element={<menu.component {...menu.props} />} />
          ))}
        </Routes>
      </div>
    </div>
  )
}

const menus = [
  {
    name: 'home',
    path: '/',
    component: () => <div />,
    props: {}
  },
  {
    name: 'menuBar',
    path: '/menuBar',
    component: NotionMenuBar,
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
