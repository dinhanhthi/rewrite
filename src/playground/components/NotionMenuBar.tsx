/**
 * Copy directly the element from Notion site. Then use https://staxmanade.com/CssToReact/ to covert
 * the css to react style object.
 * TIP: There are a lot of duplicated styles, use search and replace to do things faster.
 */

import React from 'react'

export default function NotionMenuBar() {
  return (
    <div
      className="notion-playground"
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        height: '36px',
        background: 'white',
        overflow: 'hidden',
        fontSize: '14px',
        lineHeight: '1.2',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.07) 0px 16px 24px 0px, rgba(0, 0, 0, 0.1) 0px 2px 6px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
        pointerEvents: 'auto',
        padding: '4px',
        fontFamily:
          'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'
      }}
    >
      <div
        role="button"
        tabIndex={0}
        style={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '0px 8px',
          whiteSpace: 'nowrap',
          borderRadius: '6px',
          height: '28px'
        }}
      >
        <svg
          role="graphics-symbol"
          viewBox="0 0 16 16"
          className="sparkles"
          style={{
            width: '16px',
            height: '16px',
            display: 'block',
            fill: 'rgb(167, 130, 195)',
            flexShrink: '0',
            marginRight: '4px'
          }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.2757 4.82358C7.57934 4.71847 7.57934 4.53161 7.2757 4.41483L5.62905 3.78419C5.33709 3.67908 4.99842 3.3404 4.88164 3.03676L4.25101 1.39009C4.1459 1.08644 3.95905 1.08644 3.84226 1.39009L3.21163 3.03676C3.10653 3.32872 2.76786 3.6674 2.46422 3.78419L0.817572 4.41483C0.513934 4.51994 0.513934 4.70679 0.817572 4.82358L2.46422 5.45422C2.75618 5.55933 3.09485 5.898 3.21163 6.20165L3.84226 7.84832C3.94737 8.15196 4.13422 8.15196 4.25101 7.84832L4.88164 6.20165C4.98674 5.90968 5.32541 5.571 5.62905 5.45422L7.2757 4.82358ZM15.2991 10.5929C16.2334 10.3593 16.2334 9.9739 15.2991 9.74032L13.2321 9.22647C12.2978 8.9929 11.3402 8.03526 11.1066 7.10097L10.5928 5.03387C10.3592 4.09959 9.97382 4.09959 9.74025 5.03387L9.2264 7.10097C8.99283 8.03526 8.03521 8.9929 7.10094 9.22647L5.03387 9.74032C4.09961 9.9739 4.09961 10.3593 5.03387 10.5929L7.10094 11.1067C8.03521 11.3403 8.99283 12.2979 9.2264 13.2322L9.74025 15.2993C9.97382 16.2336 10.3592 16.2336 10.5928 15.2993L11.1066 13.2322C11.3402 12.2979 12.2978 11.3403 13.2321 11.1067L15.2991 10.5929Z"
          ></path>
        </svg>
        <span style={{ fontWeight: '500', color: 'rgb(167, 130, 195)' }}>Ask AI</span>
      </div>
      <div
        style={{
          height: '24px',
          width: '1px',
          borderRight: '1px solid rgba(55, 53, 47, 0.09)',
          margin: 'auto 6px'
        }}
      ></div>
      <div
        role="button"
        tabIndex={0}
        style={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '7px',
          paddingRight: '6px',
          whiteSpace: 'nowrap',
          color: 'rgb(120, 119, 116)',
          borderRadius: '6px'
        }}
      >
        Text
        <svg
          role="graphics-symbol"
          viewBox="0 0 30 30"
          className="chevronDown"
          style={{
            width: '10px',
            height: '100%',
            display: 'block',
            fill: 'rgba(55, 53, 47, 0.35)',
            flexShrink: '0',
            marginLeft: '4px'
          }}
        >
          <polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon>
        </svg>
      </div>
      <div
        role="button"
        tabIndex={0}
        style={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '6px',
          paddingLeft: '7px',
          paddingRight: '6px',
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="link"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0',
              color: 'rgb(120, 119, 116)'
            }}
          >
            <path d="M7.69922 10.8945L8.73828 9.84863C7.91797 9.77344 7.34375 9.51367 6.91992 9.08984C5.76465 7.93457 5.76465 6.29395 6.91309 5.14551L9.18262 2.87598C10.3379 1.7207 11.9717 1.7207 13.127 2.87598C14.2891 4.04492 14.2822 5.67188 13.1338 6.82031L11.958 7.99609C12.1768 8.49512 12.2451 9.10352 12.1289 9.62988L14.0908 7.6748C15.7725 6 15.7793 3.62109 14.084 1.92578C12.3887 0.223633 10.0098 0.237305 8.33496 1.91211L5.95605 4.29785C4.28125 5.97266 4.26758 8.35156 5.96289 10.0469C6.36621 10.4434 6.90625 10.7441 7.69922 10.8945ZM8.30078 5.13184L7.26855 6.17773C8.08203 6.25293 8.66309 6.51953 9.08008 6.93652C10.2422 8.09863 10.2422 9.73242 9.08691 10.8809L6.81738 13.1504C5.66211 14.3057 4.03516 14.3057 2.87305 13.1504C1.71094 11.9883 1.71777 10.3545 2.87305 9.20605L4.04199 8.03027C3.83008 7.53125 3.75488 6.92969 3.87109 6.39648L1.91602 8.35156C0.234375 10.0264 0.227539 12.4121 1.92285 14.1074C3.61816 15.8027 5.99707 15.7891 7.67188 14.1143L10.0439 11.7354C11.7256 10.0537 11.7324 7.6748 10.0371 5.98633C9.64062 5.58301 9.10059 5.28223 8.30078 5.13184Z"></path>
          </svg>
          <svg
            role="graphics-symbol"
            viewBox="0 0 30 30"
            className="chevronDown"
            style={{
              width: '10px',
              height: '100%',
              display: 'block',
              fill: 'rgba(55, 53, 47, 0.35)',
              flexShrink: '0'
            }}
          >
            <polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon>
          </svg>
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Write a comment"
        style={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
          whiteSpace: 'nowrap',
          borderRadius: '6px',
          color: 'rgb(120, 119, 116)',
          fill: 'rgb(120, 119, 116)',
          height: '28px'
        }}
      >
        <svg
          role="graphics-symbol"
          viewBox="0 0 16 16"
          className="speechBubbleFilled"
          style={{
            width: '16px',
            height: '16px',
            display: 'block',
            fill: 'inherit',
            flexShrink: '0',
            marginTop: '1px',
            marginRight: '0px'
          }}
        >
          <path d="M4.32 15.424c.39 0 .677-.192 1.149-.609l2.344-2.064h4.116c2.057 0 3.213-1.19 3.213-3.22V4.22c0-2.03-1.156-3.22-3.213-3.22H3.213C1.163 1 0 2.19 0 4.22V9.53c0 2.037 1.196 3.22 3.165 3.22h.28v1.675c0 .608.322.998.875.998zm.342-1.531v-1.949c0-.403-.178-.56-.56-.56H3.26c-1.285 0-1.9-.65-1.9-1.894V4.26c0-1.243.615-1.893 1.9-1.893h8.627c1.278 0 1.893.65 1.893 1.894v5.23c0 1.243-.615 1.893-1.893 1.893h-4.15c-.417 0-.622.068-.909.369l-2.167 2.14zm-.567-8.668h6.884a.433.433 0 00.423-.438.425.425 0 00-.423-.417H4.095a.419.419 0 00-.417.417c0 .24.184.438.417.438zm0 2.167h6.884a.427.427 0 000-.855H4.095a.425.425 0 00-.417.424c0 .24.184.43.417.43zm0 2.173h4.484c.24 0 .424-.191.424-.423 0-.24-.185-.431-.424-.431H4.095a.422.422 0 00-.417.43.42.42 0 00.417.424z"></path>
        </svg>
      </div>
      <div
        style={{
          height: '24px',
          width: '1px',
          borderRight: '1px solid rgba(55, 53, 47, 0.09)',
          margin: 'auto 6px'
        }}
      ></div>
      <div className="notion-group-text" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fill: 'rgb(120, 119, 116)',
            borderRadius: '6px',
            height: '28px',
            width: '28px',
            padding: '6px'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="bold"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M5.067 13.014c-.772 0-1.223-.451-1.223-1.238V4.36c0-.786.45-1.237 1.223-1.237h3.5c1.949 0 3.131.943 3.131 2.488 0 1.1-.793 1.97-1.948 2.12v.061c1.401.068 2.4 1.046 2.4 2.386 0 1.716-1.347 2.837-3.466 2.837H5.067zm1.238-5.81h1.34c1.025 0 1.633-.459 1.633-1.225 0-.738-.553-1.168-1.483-1.168h-1.49v2.392zm0 4.142h1.6c1.148 0 1.742-.472 1.742-1.347 0-.854-.642-1.32-1.804-1.32H6.305v2.667z"></path>
            </g>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fill: 'rgb(35, 131, 226)',
            borderRadius: '6px',
            height: '28px',
            width: '28px',
            padding: '6px'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="italic"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M5.02 13.014c-.397 0-.67-.24-.67-.63 0-.382.266-.614.663-.614H6.42l1.593-7.404H6.612c-.396 0-.67-.239-.67-.629 0-.383.267-.615.663-.615h4.382c.397 0 .663.232.663.615 0 .39-.273.63-.67.63H9.586l-1.6 7.403h1.409c.396 0 .663.232.663.615 0 .39-.274.629-.67.629H5.02z"></path>
            </g>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fill: 'rgb(120, 119, 116)',
            borderRadius: '6px',
            height: '28px',
            width: '28px',
            padding: '6px'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="underline"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M8 13.191c-.843 0-1.572-.152-2.188-.458a3.46 3.46 0 01-1.421-1.292c-.333-.551-.5-1.191-.5-1.92V3.724c0-.242.071-.431.213-.568.14-.141.33-.212.567-.212.246 0 .44.071.58.212.147.137.22.326.22.568v5.653c0 .488.098.914.294 1.278.2.36.49.64.868.841.378.2.834.3 1.367.3.798 0 1.417-.22 1.86-.662.446-.442.67-1.028.67-1.757V3.724c0-.242.07-.431.211-.568.142-.141.33-.212.568-.212.246 0 .44.071.58.212.147.137.22.326.22.568V9.52c0 .729-.167 1.369-.5 1.92-.332.552-.809.982-1.428 1.292-.616.306-1.342.458-2.181.458zm-3.623 2.174a.487.487 0 01-.349-.136.464.464 0 01-.136-.342c0-.137.045-.25.136-.342a.487.487 0 01.349-.137h7.24c.14 0 .257.046.348.137a.453.453 0 01.143.342c0 .136-.048.25-.143.341a.472.472 0 01-.349.137H4.377z"></path>
            </g>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fill: 'rgb(120, 119, 116)',
            borderRadius: '6px',
            height: '28px',
            width: '28px',
            padding: '6px'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="strikethrough"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M7.973 13.191a5.695 5.695 0 01-1.75-.253 3.694 3.694 0 01-1.306-.71 2.376 2.376 0 01-.71-1.101 1.514 1.514 0 01-.062-.424c0-.205.061-.369.184-.492a.71.71 0 01.513-.185c.155 0 .28.034.376.103a.92.92 0 01.273.328c.128.296.31.554.547.772.237.215.52.379.848.493.328.114.69.17 1.087.17.45 0 .847-.066 1.19-.198.345-.136.614-.321.806-.553.196-.237.294-.506.294-.807 0-.383-.15-.688-.451-.916-.301-.232-.796-.43-1.484-.595L7.043 8.53c-.939-.21-1.636-.528-2.092-.957-.451-.433-.677-.998-.677-1.695 0-.574.158-1.082.472-1.524.32-.443.757-.787 1.313-1.033.556-.25 1.191-.376 1.907-.376.601 0 1.148.09 1.64.267.497.173.91.415 1.238.725.328.31.547.67.656 1.08a.82.82 0 01.034.177c.01.055.014.11.014.164a.625.625 0 01-.185.472c-.123.119-.29.178-.499.178-.287 0-.506-.132-.656-.397a2.244 2.244 0 00-.506-.745 1.98 1.98 0 00-.752-.458 2.897 2.897 0 00-.984-.157c-.406 0-.766.064-1.08.191a1.742 1.742 0 00-.745.527 1.233 1.233 0 00-.267.78c0 .36.148.648.444.867.301.214.784.399 1.45.554l1.169.267c1.016.227 1.756.553 2.221.977.47.42.704.998.704 1.736 0 .611-.162 1.147-.485 1.607-.32.456-.77.809-1.354 1.06-.578.25-1.262.375-2.05.375zM2.552 8.386a.363.363 0 01-.267-.11.378.378 0 01-.11-.266c0-.1.037-.187.11-.26a.352.352 0 01.267-.116h10.89c.104 0 .193.039.266.116.073.073.11.16.11.26s-.037.189-.11.266a.363.363 0 01-.267.11H2.551z"></path>
            </g>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fill: 'rgb(120, 119, 116)',
            borderRadius: '6px',
            height: '28px',
            width: '28px',
            padding: '6px'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="code"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M.056 8.122a.72.72 0 01.07-.306.91.91 0 01.204-.285l3.39-3.05a.745.745 0 01.542-.215.675.675 0 01.505.236c.14.158.202.337.188.537a.737.737 0 01-.264.51L1.855 8.122l2.836 2.573a.737.737 0 01.264.51.716.716 0 01-.188.537.694.694 0 01-.505.242.766.766 0 01-.543-.22L.33 8.708a.87.87 0 01-.204-.274.756.756 0 01-.07-.312zm6.43 5.21a.675.675 0 01-.446-.355.782.782 0 01-.027-.58l2.605-8.942c.068-.226.186-.384.354-.473a.714.714 0 01.559-.054.678.678 0 01.446.344.69.69 0 01.048.553l-2.621 8.98a.738.738 0 01-.35.463.711.711 0 01-.569.064zm9.453-5.21a.695.695 0 01-.065.312.869.869 0 01-.204.274l-3.39 3.056a.773.773 0 01-.547.22.677.677 0 01-.5-.242.707.707 0 01-.193-.537.738.738 0 01.263-.51l2.841-2.573-2.84-2.573a.738.738 0 01-.264-.51.7.7 0 01.193-.537.659.659 0 01.5-.236.75.75 0 01.548.214l3.389 3.051a.91.91 0 01.204.285c.047.1.068.202.064.306z"></path>
            </g>
          </svg>
        </div>
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: 'none',
            transition: 'background 20ms ease-in 0s',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '6px',
            padding: '6px',
            width: '28px',
            height: '28px',
            fill: 'rgb(120, 119, 116)'
          }}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="equation"
            style={{
              width: '16px',
              height: '16px',
              display: 'block',
              fill: 'inherit',
              flexShrink: '0'
            }}
          >
            <g>
              <path d="M3.31 14.128c-.373 0-.665-.107-.874-.321a1.956 1.956 0 01-.472-.82L.576 8.466a2.875 2.875 0 01-.061-.211 1.26 1.26 0 01-.02-.233c0-.205.07-.378.211-.52a.75.75 0 01.554-.218c.205 0 .369.055.492.164.123.11.216.276.28.5l1.23 4.326H3.4l2.83-9.27c.114-.368.278-.637.493-.806.214-.173.533-.26.957-.26h7.04c.238 0 .427.069.568.206a.706.706 0 01.219.54.736.736 0 01-.219.553c-.141.137-.33.205-.567.205H7.713l-2.98 9.482a2.294 2.294 0 01-.506.861c-.215.228-.52.342-.916.342zm5.715-1.299a.625.625 0 01-.45-.17.572.572 0 01-.179-.432.77.77 0 01.158-.457l1.763-2.414-1.668-2.29a.79.79 0 01-.191-.499c0-.173.064-.32.191-.444a.677.677 0 01.479-.185c.146 0 .267.03.362.09a.957.957 0 01.294.307l1.45 2.112h.04l1.395-2.105c.1-.15.198-.255.294-.315a.664.664 0 01.355-.089c.187 0 .342.06.465.178a.562.562 0 01.185.43c0 .16-.06.318-.178.473l-1.75 2.365 1.736 2.351a.77.77 0 01.171.472.589.589 0 01-.191.451.667.667 0 01-.472.171.642.642 0 01-.355-.089 1.357 1.357 0 01-.301-.328l-1.45-2.099h-.034l-1.462 2.1c-.11.154-.212.263-.308.327a.628.628 0 01-.349.09z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        style={{
          userSelect: 'none',
          transition: 'background 20ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '7px',
          paddingRight: '6px',
          whiteSpace: 'nowrap',
          borderRadius: '6px'
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            background: 'rgb(55, 53, 47)'
          }}
        ></div>
        <svg
          role="graphics-symbol"
          viewBox="0 0 30 30"
          className="chevronDown"
          style={{
            width: '10px',
            height: '100%',
            display: 'block',
            fill: 'rgba(55, 53, 47, 0.35)',
            flexShrink: '0',
            marginLeft: '4px'
          }}
        >
          <polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon>
        </svg>
      </div>
      <div
        style={{
          height: '24px',
          width: '1px',
          borderRight: '1px solid rgba(55, 53, 47, 0.09)',
          margin: 'auto 6px'
        }}
      ></div>
      <div
        role="button"
        tabIndex={0}
        style={{
          userSelect: 'none',
          transition: 'opacity 200ms ease-in 0s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: '0',
          width: '28px',
          height: '28px',
          fill: 'rgba(55, 53, 47, 0.45)',
          borderRadius: '6px',
          padding: '6px'
        }}
      >
        <svg
          role="graphics-symbol"
          viewBox="0 0 16 16"
          className="ellipsis"
          style={{
            width: '16px',
            height: '16px',
            display: 'block',
            fill: 'rgb(120, 119, 116)',
            flexShrink: '0'
          }}
        >
          <path d="M2.887 9.014c.273 0 .52-.064.738-.192.219-.132.394-.307.526-.526.133-.219.199-.46.199-.725 0-.405-.142-.747-.424-1.025a1.41 1.41 0 00-1.04-.417c-.264 0-.505.066-.724.198a1.412 1.412 0 00-.718 1.244c0 .265.064.506.192.725.132.219.307.394.526.526.219.128.46.192.725.192zm5.113 0a1.412 1.412 0 001.244-.718c.132-.219.198-.46.198-.725 0-.405-.14-.747-.423-1.025A1.386 1.386 0 008 6.129c-.264 0-.506.066-.725.198a1.412 1.412 0 00-.718 1.244c0 .265.064.506.192.725.132.219.308.394.526.526.22.128.46.192.725.192zm5.106 0c.265 0 .506-.064.725-.192.219-.132.394-.307.526-.526.133-.219.199-.46.199-.725 0-.405-.142-.747-.424-1.025a1.394 1.394 0 00-1.026-.417 1.474 1.474 0 00-1.265.718c-.127.218-.19.46-.19.724 0 .265.063.506.19.725.133.219.308.394.527.526.223.128.47.192.738.192z"></path>
        </svg>
      </div>
    </div>
  )
}
