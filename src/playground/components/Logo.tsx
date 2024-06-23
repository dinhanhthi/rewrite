import React from 'react'

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[150px] text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 to-green-600">
        ✍
      </div>

      <div className="text-[150px] font-medium text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap">
        ✍ Rewrite
      </div>
    </div>
  )
}
