import React from 'react'

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-20">
      <div className="flex items-center justify-center border border-green-600 aspect-square">
        <div className="text-[150px] text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 to-green-600">
          ✍
        </div>
      </div>

      <div className="flex items-center justify-center px-10 border border-green-600">
        <div className="text-[150px] font-medium text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap">
          ✍ Rewrite
        </div>
      </div>
    </div>
  )
}
