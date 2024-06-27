import React, { SVGProps } from 'react'

export default function ShorterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="graphics-symbol"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        fill="none"
        d="M1.55371 6.81055C1.21875 6.81055 0.952148 6.54395 0.952148 6.20898C0.952148 5.87402 1.21875 5.60742 1.55371 5.60742H14.4395C14.7744 5.60742 15.0479 5.87402 15.0479 6.20898C15.0479 6.54395 14.7744 6.81055 14.4395 6.81055H1.55371ZM1.55371 10.3926C1.21875 10.3926 0.952148 10.126 0.952148 9.79102C0.952148 9.45605 1.21875 9.18945 1.55371 9.18945H9.2168C9.55176 9.18945 9.81836 9.45605 9.81836 9.79102C9.81836 10.126 9.55176 10.3926 9.2168 10.3926H1.55371Z"
      ></path>
    </svg>
  )
}
