import { SVGProps } from 'react'

export const BookmarkAdd = ({ stroke, className }: SVGProps<SVGSVGElement>) => (
  <svg className={className} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.5 11.0137H9.5"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8.57361V13.5736"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.82 2.36365H7.18001C5.05001 2.36365 3.32001 4.10365 3.32001 6.22365V20.3136C3.32001 22.1136 4.61001 22.8736 6.19001 22.0036L11.07 19.2936C11.59 19.0036 12.43 19.0036 12.94 19.2936L17.82 22.0036C19.4 22.8836 20.69 22.1236 20.69 20.3136V6.22365C20.68 4.10365 18.95 2.36365 16.82 2.36365Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BookmarkDelete = ({ fill, stroke }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 10.6499H9.5"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MessageQuestion = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 18.4297H13L8.54999 21.3897C7.88999 21.8297 7 21.3598 7 20.5598V18.4297C4 18.4297 2 16.4297 2 13.4297V7.42969C2 4.42969 4 2.42969 7 2.42969H17C20 2.42969 22 4.42969 22 7.42969V13.4297C22 16.4297 20 18.4297 17 18.4297Z"
      stroke="#353738"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9998 11.3594V11.1494C11.9998 10.4694 12.4198 10.1094 12.8398 9.8194C13.2498 9.5394 13.6598 9.17941 13.6598 8.51941C13.6598 7.59941 12.9198 6.85938 11.9998 6.85938C11.0798 6.85938 10.3398 7.59941 10.3398 8.51941"
      stroke="#353738"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.9955 13.75H12.0045" stroke="#353738" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
