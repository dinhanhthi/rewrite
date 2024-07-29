/**
 * Copy directly the element from Notion site. Then use https://staxmanade.com/CssToReact/ to covert
 * the css to react style object.
 * TIP: There are a lot of duplicated styles, use search and replace to do things faster.
 */

import React from 'react'
import { Switch } from '../../components/ui/switch'
import RewriteOptWrapper from '../../content-script/notion/rewrite-opt-wrapper'

export default function NotionPopoverMenu() {
  const defaultShowMenu = true
  const [alwaysShowMenu, setShowMenu] = React.useState(defaultShowMenu)
  const handleOnCheckedChange = (val: boolean) => setShowMenu(val)

  return (
    <div className='flex flex-col gap-4'>
      <div className="z-20 flex items-center gap-2">
        <Switch
          className="bg-green-700"
          defaultChecked={defaultShowMenu}
          onCheckedChange={handleOnCheckedChange}
          id="hide-overlay"
        />
        <label htmlFor="hide-overlay" className="text-base">
          Always show menu
        </label>
      </div>

      <div
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
          fontSize: '14px',
          color: 'rgb(55, 53, 47)'
        }}
      >
        {/* Search input */}
        <div style={{ flexShrink: '0' }}>
          <div style={{ paddingTop: '6px', paddingBottom: '6px', marginTop: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  marginLeft: '12px',
                  marginRight: '12px',
                  minWidth: '0px',
                  flex: '1 1 auto'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div
                    className="notion-focusable-within"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      fontSize: '14px',
                      lineHeight: '20px',
                      position: 'relative',
                      borderRadius: '4px',
                      boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
                      background: 'rgba(242, 241, 238, 0.6)',
                      cursor: 'text',
                      padding: '3px 6px',
                      height: '28px'
                    }}
                  >
                    <input
                      className="outline-none"
                      placeholder="Search actions…"
                      type="text"
                      style={{
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        border: 'none',
                        background: 'none',
                        width: '100%',
                        display: 'block',
                        resize: 'none',
                        padding: '0px'
                      }}
                      aria-activedescendant=":r9e:"
                      aria-controls=":r95:"
                      aria-expanded="true"
                      aria-autocomplete="list"
                      role="combobox"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dinhanhthi rewrite-opt notion-ignore">
          <RewriteOptWrapper alwaysShowMenu={alwaysShowMenu} />
        </div>

        {/* Comment */}
        <div className="notion-playground" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <div
            role="option"
            tabIndex={-1}
            id=":r96:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="speechBubbleFilled"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M4.32 15.424c.39 0 .677-.192 1.149-.609l2.344-2.064h4.116c2.057 0 3.213-1.19 3.213-3.22V4.22c0-2.03-1.156-3.22-3.213-3.22H3.213C1.163 1 0 2.19 0 4.22V9.53c0 2.037 1.196 3.22 3.165 3.22h.28v1.675c0 .608.322.998.875.998zm.342-1.531v-1.949c0-.403-.178-.56-.56-.56H3.26c-1.285 0-1.9-.65-1.9-1.894V4.26c0-1.243.615-1.893 1.9-1.893h8.627c1.278 0 1.893.65 1.893 1.894v5.23c0 1.243-.615 1.893-1.893 1.893h-4.15c-.417 0-.622.068-.909.369l-2.167 2.14zm-.567-8.668h6.884a.433.433 0 00.423-.438.425.425 0 00-.423-.417H4.095a.419.419 0 00-.417.417c0 .24.184.438.417.438zm0 2.167h6.884a.427.427 0 000-.855H4.095a.425.425 0 00-.417.424c0 .24.184.43.417.43zm0 2.173h4.484c.24 0 .424-.191.424-.423 0-.24-.185-.431-.424-.431H4.095a.422.422 0 00-.417.43.42.42 0 00.417.424z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Comment
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⌘+Shift+M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Group actions */}
        <div
          style={{
            paddingTop: '6px',
            paddingBottom: '6px',
            boxShadow: 'rgba(55, 53, 47, 0.09) 0px -1px 0px',
            marginTop: '1px'
          }}
        >
          {/* Ask AI */}
          <div
            className="notion-playground"
            role="option"
            tabIndex={-1}
            id=":r97:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="sparkles"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'inherit',
                      flexShrink: '0'
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.2757 4.82358C7.57934 4.71847 7.57934 4.53161 7.2757 4.41483L5.62905 3.78419C5.33709 3.67908 4.99842 3.3404 4.88164 3.03676L4.25101 1.39009C4.1459 1.08644 3.95905 1.08644 3.84226 1.39009L3.21163 3.03676C3.10653 3.32872 2.76786 3.6674 2.46422 3.78419L0.817572 4.41483C0.513934 4.51994 0.513934 4.70679 0.817572 4.82358L2.46422 5.45422C2.75618 5.55933 3.09485 5.898 3.21163 6.20165L3.84226 7.84832C3.94737 8.15196 4.13422 8.15196 4.25101 7.84832L4.88164 6.20165C4.98674 5.90968 5.32541 5.571 5.62905 5.45422L7.2757 4.82358ZM15.2991 10.5929C16.2334 10.3593 16.2334 9.9739 15.2991 9.74032L13.2321 9.22647C12.2978 8.9929 11.3402 8.03526 11.1066 7.10097L10.5928 5.03387C10.3592 4.09959 9.97382 4.09959 9.74025 5.03387L9.2264 7.10097C8.99283 8.03526 8.03521 8.9929 7.10094 9.22647L5.03387 9.74032C4.09961 9.9739 4.09961 10.3593 5.03387 10.5929L7.10094 11.1067C8.03521 11.3403 8.99283 12.2979 9.2264 13.2322L9.74025 15.2993C9.97382 16.2336 10.3592 16.2336 10.5928 15.2993L11.1066 13.2322C11.3402 12.2979 12.2978 11.3403 13.2321 11.1067L15.2991 10.5929Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Ask AI
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⌘+J
                </span>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div
            className="notion-playground"
            role="option"
            tabIndex={-1}
            id=":r98:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="trash"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'inherit',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M4.8623 15.4287H11.1445C12.1904 15.4287 12.8672 14.793 12.915 13.7402L13.3799 3.88965H14.1318C14.4736 3.88965 14.7402 3.62988 14.7402 3.28809C14.7402 2.95312 14.4736 2.69336 14.1318 2.69336H11.0898V1.66797C11.0898 0.62207 10.4268 0 9.29199 0H6.69434C5.56641 0 4.89648 0.62207 4.89648 1.66797V2.69336H1.86133C1.5332 2.69336 1.25977 2.95312 1.25977 3.28809C1.25977 3.62988 1.5332 3.88965 1.86133 3.88965H2.62012L3.08496 13.7471C3.13281 14.7998 3.80273 15.4287 4.8623 15.4287ZM6.1543 1.72949C6.1543 1.37402 6.40039 1.14844 6.7832 1.14844H9.20312C9.58594 1.14844 9.83203 1.37402 9.83203 1.72949V2.69336H6.1543V1.72949ZM4.99219 14.2188C4.61621 14.2188 4.34277 13.9453 4.32227 13.542L3.86426 3.88965H12.1152L11.6709 13.542C11.6572 13.9453 11.3838 14.2188 10.9941 14.2188H4.99219ZM5.9834 13.1182C6.27051 13.1182 6.45508 12.9336 6.44824 12.667L6.24316 5.50293C6.23633 5.22949 6.04492 5.05176 5.77148 5.05176C5.48438 5.05176 5.2998 5.23633 5.30664 5.50293L5.51172 12.667C5.51855 12.9404 5.70996 13.1182 5.9834 13.1182ZM8 13.1182C8.28711 13.1182 8.47852 12.9336 8.47852 12.667V5.50293C8.47852 5.23633 8.28711 5.05176 8 5.05176C7.71289 5.05176 7.52148 5.23633 7.52148 5.50293V12.667C7.52148 12.9336 7.71289 13.1182 8 13.1182ZM10.0166 13.1182C10.29 13.1182 10.4746 12.9404 10.4814 12.667L10.6934 5.50293C10.7002 5.23633 10.5088 5.05176 10.2285 5.05176C9.95508 5.05176 9.76367 5.22949 9.75684 5.50293L9.54492 12.667C9.53809 12.9336 9.72949 13.1182 10.0166 13.1182Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Delete
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  Del or Ctrl+D
                </span>
              </div>
            </div>
          </div>

          {/* Duplicate */}
          <div
            className="notion-playground"
            role="option"
            tabIndex={-1}
            id=":r99:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="duplicate"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M2.83887 12.1523H4.00098V13.1846C4.00098 14.6406 4.75977 15.3994 6.24316 15.3994H13.1611C14.6377 15.3994 15.4033 14.6406 15.4033 13.1846V6.21191C15.4033 4.75586 14.6377 3.99707 13.1611 3.99707H11.999V2.96484C11.999 1.50879 11.2334 0.75 9.75684 0.75H2.83887C1.3623 0.75 0.59668 1.50195 0.59668 2.96484V9.93066C0.59668 11.3936 1.3623 12.1523 2.83887 12.1523ZM2.9209 10.8125C2.28516 10.8125 1.93652 10.4844 1.93652 9.82129V3.08105C1.93652 2.41797 2.28516 2.08301 2.9209 2.08301H9.68164C10.3105 2.08301 10.666 2.41797 10.666 3.08105V3.99707H6.24316C4.75977 3.99707 4.00098 4.75586 4.00098 6.21191V10.8125H2.9209ZM6.31836 14.0596C5.68262 14.0596 5.34082 13.7314 5.34082 13.0684V6.32812C5.34082 5.66504 5.68262 5.33691 6.31836 5.33691H13.0791C13.708 5.33691 14.0635 5.66504 14.0635 6.32812V13.0684C14.0635 13.7314 13.708 14.0596 13.0791 14.0596H6.31836Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Duplicate
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⌘+D
                </span>
              </div>
            </div>
          </div>

          {/* Turn into */}
          <div
            className="notion-playground"
            role="option"
            tabIndex={-1}
            id=":r9a:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="loop"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M5.80371 3.12305C5.81006 3.50391 6.05762 3.74512 6.47656 3.74512H11.3643C11.9546 3.74512 12.2783 4.0498 12.2783 4.66553V11.2925L11.377 10.3149L10.8628 9.80078C10.5962 9.54688 10.2344 9.52783 9.96777 9.78809C9.71387 10.0483 9.72021 10.4229 9.98047 10.6831L12.145 12.8413C12.6211 13.311 13.167 13.311 13.6431 12.8413L15.8076 10.6831C16.0679 10.4229 16.0742 10.0483 15.8203 9.78809C15.5537 9.52783 15.1919 9.54688 14.9253 9.80078L14.4111 10.3149L13.5161 11.2861V4.56396C13.5161 3.20557 12.8052 2.50098 11.4341 2.50098H6.47656C6.05762 2.50098 5.79736 2.74219 5.80371 3.12305ZM0.186035 7.05859C0.446289 7.3252 0.808105 7.30615 1.07471 7.0459L1.59521 6.53809L2.48389 5.56689V12.2891C2.48389 13.6475 3.19482 14.3521 4.56592 14.3521H9.52344C9.94238 14.3521 10.2026 14.1108 10.1963 13.73C10.1899 13.3428 9.94238 13.1079 9.52344 13.1079H4.64209C4.05176 13.1079 3.72803 12.7969 3.72803 12.1812V5.5542L4.62305 6.53809L5.14355 7.0459C5.40381 7.30615 5.77197 7.3252 6.03223 7.05859C6.29248 6.79834 6.28613 6.43018 6.01953 6.16992L3.85498 4.01172C3.37891 3.53564 2.83936 3.53564 2.36328 4.01172L0.19873 6.16992C-0.0678711 6.43018 -0.0742188 6.79834 0.186035 7.05859Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{
                  marginLeft: '6px',
                  marginRight: '12px',
                  minWidth: '0px',
                  flex: '1 1 auto'
                }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Turn into
                </div>
              </div>
              <div
                style={{
                  width: '12px',
                  transform: 'rotate(90deg)',
                  fill: 'rgba(55, 53, 47, 0.35)',
                  marginRight: '10px',
                  flexShrink: '0'
                }}
              >
                <svg
                  role="graphics-symbol"
                  viewBox="0 0 16 16"
                  className="chevronRight"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    fill: 'rgba(55, 53, 47, 0.45)',
                    flexShrink: '0',
                    transform: 'rotate(-90deg)'
                  }}
                >
                  <path d="M12.375 8.06445C12.375 7.83203 12.2861 7.63379 12.1084 7.45605L6.77637 2.24023C6.62598 2.08984 6.44141 2.01465 6.22266 2.01465C5.77832 2.01465 5.42285 2.35645 5.42285 2.80078C5.42285 3.01953 5.51172 3.21777 5.66211 3.375L10.4746 8.06445L5.66211 12.7539C5.51855 12.9043 5.42285 13.1025 5.42285 13.3213C5.42285 13.7725 5.77832 14.1143 6.22266 14.1143C6.44141 14.1143 6.62598 14.0391 6.77637 13.8887L12.1084 8.67285C12.293 8.49512 12.375 8.29688 12.375 8.06445Z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Turn into page in */}
          <div
            className="notion-playground"
            role="option"
            tabIndex={-1}
            id=":r9b:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="pageEmpty"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{
                  marginLeft: '6px',
                  marginRight: '12px',
                  minWidth: '0px',
                  flex: '1 1 auto'
                }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Turn into page in
                </div>
              </div>
              <div
                style={{
                  width: '12px',
                  transform: 'rotate(90deg)',
                  fill: 'rgba(55, 53, 47, 0.35)',
                  marginRight: '10px',
                  flexShrink: '0'
                }}
              >
                <svg
                  role="graphics-symbol"
                  viewBox="0 0 16 16"
                  className="chevronRight"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    fill: 'rgba(55, 53, 47, 0.45)',
                    flexShrink: '0',
                    transform: 'rotate(-90deg)'
                  }}
                >
                  <path d="M12.375 8.06445C12.375 7.83203 12.2861 7.63379 12.1084 7.45605L6.77637 2.24023C6.62598 2.08984 6.44141 2.01465 6.22266 2.01465C5.77832 2.01465 5.42285 2.35645 5.42285 2.80078C5.42285 3.01953 5.51172 3.21777 5.66211 3.375L10.4746 8.06445L5.66211 12.7539C5.51855 12.9043 5.42285 13.1025 5.42285 13.3213C5.42285 13.7725 5.77832 14.1143 6.22266 14.1143C6.44141 14.1143 6.62598 14.0391 6.77637 13.8887L12.1084 8.67285C12.293 8.49512 12.375 8.29688 12.375 8.06445Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Copy link */}
        <div
          className="notion-playground"
          style={{
            paddingTop: '6px',
            paddingBottom: '6px',
            boxShadow: 'rgba(55, 53, 47, 0.09) 0px -1px 0px',
            marginTop: '1px'
          }}
        >
          <div
            role="option"
            tabIndex={-1}
            id=":r9c:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="link"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M7.69922 10.8945L8.73828 9.84863C7.91797 9.77344 7.34375 9.51367 6.91992 9.08984C5.76465 7.93457 5.76465 6.29395 6.91309 5.14551L9.18262 2.87598C10.3379 1.7207 11.9717 1.7207 13.127 2.87598C14.2891 4.04492 14.2822 5.67188 13.1338 6.82031L11.958 7.99609C12.1768 8.49512 12.2451 9.10352 12.1289 9.62988L14.0908 7.6748C15.7725 6 15.7793 3.62109 14.084 1.92578C12.3887 0.223633 10.0098 0.237305 8.33496 1.91211L5.95605 4.29785C4.28125 5.97266 4.26758 8.35156 5.96289 10.0469C6.36621 10.4434 6.90625 10.7441 7.69922 10.8945ZM8.30078 5.13184L7.26855 6.17773C8.08203 6.25293 8.66309 6.51953 9.08008 6.93652C10.2422 8.09863 10.2422 9.73242 9.08691 10.8809L6.81738 13.1504C5.66211 14.3057 4.03516 14.3057 2.87305 13.1504C1.71094 11.9883 1.71777 10.3545 2.87305 9.20605L4.04199 8.03027C3.83008 7.53125 3.75488 6.92969 3.87109 6.39648L1.91602 8.35156C0.234375 10.0264 0.227539 12.4121 1.92285 14.1074C3.61816 15.8027 5.99707 15.7891 7.67188 14.1143L10.0439 11.7354C11.7256 10.0537 11.7324 7.6748 10.0371 5.98633C9.64062 5.58301 9.10059 5.28223 8.30078 5.13184Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Copy link to block
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⌥+Shift+L
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Move to */}
        <div
          className="notion-playground"
          style={{
            paddingTop: '6px',
            paddingBottom: '6px',
            boxShadow: 'rgba(55, 53, 47, 0.09) 0px -1px 0px',
            marginTop: '1px'
          }}
        >
          <div
            role="option"
            tabIndex={-1}
            id=":r9d:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="moveTo"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M2.34668 13.5469C2.78418 13.5469 3.07812 13.2393 3.07812 12.8018C3.07812 12.542 3.05762 12.2754 3.05762 11.8994C3.05762 9.60254 3.86426 8.67285 6.14062 8.67285H10.5771L12.2109 8.57031L10.1738 10.4297L8.64941 11.9678C8.5127 12.1045 8.43066 12.2891 8.43066 12.501C8.43066 12.9111 8.73828 13.2188 9.16895 13.2188C9.35352 13.2188 9.53809 13.1436 9.70215 12.9863L14.207 8.48145C14.3711 8.33105 14.4531 8.12598 14.4531 7.9209C14.4531 7.71582 14.3711 7.51758 14.207 7.36035L9.71582 2.86914C9.53809 2.70508 9.35352 2.62305 9.16895 2.62305C8.73828 2.62305 8.43066 2.93066 8.43066 3.34082C8.43066 3.55273 8.5127 3.7373 8.64941 3.87402L10.1738 5.41895L12.2041 7.27148L10.5771 7.17578H6.04492C2.87988 7.17578 1.54688 8.63184 1.54688 11.8516C1.54688 12.2549 1.56055 12.6035 1.61523 12.877C1.67676 13.2051 1.88184 13.5469 2.34668 13.5469Z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{ marginLeft: '6px', marginRight: '6px', minWidth: '0px', flex: '1 1 auto' }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Move to
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: '12px',
                  minWidth: '0px',
                  flexShrink: '0'
                }}
              >
                <span
                  style={{ color: 'rgba(55, 53, 47, 0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⌘+Shift+P
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Color */}
        <div
          className="notion-playground"
          style={{
            paddingTop: '6px',
            paddingBottom: '6px',
            boxShadow: 'rgba(55, 53, 47, 0.09) 0px -1px 0px',
            marginTop: '1px'
          }}
        >
          <div
            role="option"
            tabIndex={-1}
            id=":r9e:"
            style={{
              userSelect: 'none',
              transition: 'background 20ms ease-in 0s',
              cursor: 'pointer',
              width: 'calc(100% - 8px)',
              marginLeft: '4px',
              marginRight: '4px',
              borderRadius: '4px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  marginRight: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg
                    role="graphics-symbol"
                    viewBox="0 0 30 30"
                    className="blockColor"
                    style={{
                      width: '16px',
                      height: '16px',
                      display: 'block',
                      fill: 'rgba(55, 53, 47, 0.85)',
                      flexShrink: '0'
                    }}
                  >
                    <path d="M25,5c0-2.2-1.8-4-4-4H6C3.8,1,2,2.8,2,5H1v2h1c0,2.2,1.8,4,4,4h15c2.2,0,4-1.8,4-4h2v6H14v4h-2v9c0,1.657,1.344,3,3,3 s3-1.343,3-3v-9h-2v-2h13V5H25z M23,7c0,1.103-0.896,2-2,2H6C4.896,9,4,8.103,4,7V5c0-1.103,0.896-2,2-2h15c1.104,0,2,0.897,2,2V7z M16,26c0,0.552-0.449,1-1,1s-1-0.448-1-1v-7h2V26z"></path>
                  </svg>
                </div>
              </div>
              <div
                style={{
                  marginLeft: '6px',
                  marginRight: '12px',
                  minWidth: '0px',
                  flex: '1 1 auto'
                }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Color
                </div>
              </div>
              <div
                style={{
                  width: '12px',
                  transform: 'rotate(90deg)',
                  fill: 'rgba(55, 53, 47, 0.35)',
                  marginRight: '10px',
                  flexShrink: '0'
                }}
              >
                <svg
                  role="graphics-symbol"
                  viewBox="0 0 16 16"
                  className="chevronRight"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    fill: 'rgba(55, 53, 47, 0.45)',
                    flexShrink: '0',
                    transform: 'rotate(-90deg)'
                  }}
                >
                  <path d="M12.375 8.06445C12.375 7.83203 12.2861 7.63379 12.1084 7.45605L6.77637 2.24023C6.62598 2.08984 6.44141 2.01465 6.22266 2.01465C5.77832 2.01465 5.42285 2.35645 5.42285 2.80078C5.42285 3.01953 5.51172 3.21777 5.66211 3.375L10.4746 8.06445L5.66211 12.7539C5.51855 12.9043 5.42285 13.1025 5.42285 13.3213C5.42285 13.7725 5.77832 14.1143 6.22266 14.1143C6.44141 14.1143 6.62598 14.0391 6.77637 13.8887L12.1084 8.67285C12.293 8.49512 12.375 8.29688 12.375 8.06445Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Last edited */}
        <div
          style={{
            paddingTop: '8px',
            paddingBottom: '8px',
            boxShadow: 'rgba(55, 53, 47, 0.09) 0px -1px 0px',
            marginTop: '1px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              lineHeight: '120%',
              width: '100%',
              userSelect: 'none',
              minHeight: '28px',
              fontSize: '14px'
            }}
          >
            <div
              style={{ marginLeft: '12px', marginRight: '12px', minWidth: '0px', flex: '1 1 auto' }}
            >
              <div>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: 'rgba(55, 53, 47, 0.5)',
                      marginBottom: '4px'
                    }}
                  >
                    Last edited by Anh-Thi DINH
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: 'rgba(55, 53, 47, 0.5)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Yesterday at 3:15 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
