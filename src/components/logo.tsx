import Link from "next/link"
import React from "react"

const Logo = ({ width, className = "" }: { width: number; className?: string }) => {
  return (
    <Link href='/' className='flex justify-center items-center'>
      <svg
        className={`${className}`}
        width={width}
        height={width}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 64 64'
        id='blockchain'
      >
        <circle cx='32' cy='32' r='28' fill='#f3f3f3'></circle>
        <path fill='#d9d9d9' d='M9,50a1,1,0,0,1-.62-1.79l42-33a1,1,0,1,1,1.24,1.58C6.62,52.14,9.53,50,9,50Z'></path>
        <path fill='#d9d9d9' d='M55,50c-.53,0,2.06,1.89-42.62-33.21a1,1,0,1,1,1.24-1.58l42,33A1,1,0,0,1,55,50Z'></path>
        <polyline fill='#50d9d7' points='17 5 9 9 1 5 9 1 17 5'></polyline>
        <polygon fill='#50d9d7' points='17 5 17 15 9 19 9 9 17 5'></polygon>
        <polygon fill='#50d9d7' points='9 9 9 19 1 15 1 5 9 9'></polygon>
        <path
          fill='#00bebd'
          d='M17.45,4.11l-8-4a1,1,0,0,0-.9,0l-8,4A1,1,0,0,0,0,5V15a1,1,0,0,0,.55.89l8,4a.93.93,0,0,0,.8,0l8-4A1,1,0,0,0,18,15V5A1,1,0,0,0,17.45,4.11ZM9,2.12,14.76,5,9,7.88,3.24,5ZM8,17.38l-6-3V6.62l6,3Zm8-3-6,3V9.62l6-3Z'
        ></path>
        <polyline fill='#50d9d7' points='63 5 55 9 47 5 55 1 63 5'></polyline>
        <polygon fill='#50d9d7' points='63 5 63 15 55 19 55 9 63 5'></polygon>
        <polygon fill='#50d9d7' points='55 9 55 19 47 15 47 5 55 9'></polygon>
        <path
          fill='#00bebd'
          d='M63.45,4.11l-8-4a1,1,0,0,0-.9,0l-8,4A1,1,0,0,0,46,5V15a1,1,0,0,0,.55.89l8.05,4a.93.93,0,0,0,.8,0l8.05-4A1,1,0,0,0,64,15V5A1,1,0,0,0,63.45,4.11ZM55,2.12,60.76,5,55,7.88,49.24,5ZM54,17.38l-6-3V6.62l6,3Zm8-3-6,3V9.62l6-3Z'
        ></path>
        <polyline fill='#50d9d7' points='17 49 9 53 1 49 9 45 17 49'></polyline>
        <polygon fill='#50d9d7' points='17 49 17 59 9 63 9 53 17 49'></polygon>
        <polygon fill='#50d9d7' points='9 53 9 63 1 59 1 49 9 53'></polygon>
        <path
          fill='#00bebd'
          d='M17.45,48.11l-8-4a1,1,0,0,0-.9,0l-8,4A1,1,0,0,0,0,49V59a1,1,0,0,0,.55.89l8,4a.93.93,0,0,0,.8,0l8-4A1,1,0,0,0,18,59V49A1,1,0,0,0,17.45,48.11ZM9,46.12,14.76,49,9,51.88,3.24,49ZM8,61.38l-6-3V50.62l6,3Zm8-3-6,3V53.62l6-3Z'
        ></path>
        <polygon fill='#50d9d7' points='55 45 47 49 47 59 55 63 63 59 63 49 55 45'></polygon>
        <path
          fill='#00bebd'
          d='M63.45,48.11l-8-4a1,1,0,0,0-.9,0l-8,4A1,1,0,0,0,46,49V59a1,1,0,0,0,.55.89l8.05,4a.93.93,0,0,0,.8,0l8.05-4A1,1,0,0,0,64,59V49A1,1,0,0,0,63.45,48.11Zm-8.45-2L60.76,49,55,51.88,49.24,49ZM54,61.38l-6-3V50.62l6,3Zm8-3-6,3V53.62l6-3Z'
        ></path>
        <polygon fill='#ffac00' points='32 17 18 23 18 41 32 47 46 41 46 23 32 17'></polygon>
        <path
          fill='#ea9706'
          d='M47,23a1,1,0,0,0-.61-.92l-14-6a1,1,0,0,0-.78,0l-14,6A1,1,0,0,0,17,23h0V41a1,1,0,0,0,.61.92c15.35,6.58,14.19,6.21,14.74,6l14-6A1,1,0,0,0,47,41V23ZM32,18.09,43.46,23,32,27.91,20.54,23ZM19,24.52l12,5.14V45.48L19,40.34ZM45,40.34,33,45.48V29.66l12-5.14Z'
        ></path>
      </svg>
      <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight text-black mx-2 font-sans italic ${className}`}>
        Shop3Man
      </h3>
    </Link>
  )
}

export default Logo
