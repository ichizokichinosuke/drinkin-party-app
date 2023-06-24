import React from "react"
import "@/css/timeBarSvg.css"

const defaultSeconds = 60 * 20
const defaultSize = 1194

export default function TimeBarSvg( props : { animationClass: number } ) {
    const width = defaultSize * (props.animationClass) / defaultSeconds
    return (
        // <div className="svg-container">
            <svg width={`${width}`} height="18" viewBox={`0 0 ${width} 18`} fill="none" xmlns="http://www.w3.org/2000/svg" className={`${props.animationClass}`}>
            <rect width={`${width}`} height="18" fill="white"/>
            <path d={`M0 2C0 0.89543 0.895431 0 2 0H1192C1193.1 0 ${width} 0.895431 ${width} 2V18H0V2Z`} fill="#81D4FA"/>
        </svg>
        // </div>
    )
}
