import React from 'react'

export default function NotionPopoverMenu() {
  return (
    <div
      className="notion-playground"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        background: 'white',
        backdropFilter: 'none',
        position: 'relative',
        maxWidth: 'calc(-24px + 100vw)',
        boxShadow:
          'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
        overflow: 'hidden',
        width: '265px',
        fontSize: '14px'
      }}
    >
      <div className="pt-[14px] pb-[6px]">
        <div className="min-h-[28px] mx-[12px] bg-[#f8f6f5]">Search actions...</div>
      </div>
      <div></div>
    </div>
  )
}
