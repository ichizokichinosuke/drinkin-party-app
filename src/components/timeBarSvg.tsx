import React from "react"
import "@/css/timeBarSvg.css"
import { INIT_TIMEBAR_WIDTH, INIT_SECONDS } from "@/lib/constants"

const defaultSeconds = 60 * 20
const defaultSize = 1194

export default function TimeBarSvg( props : { seconds: number } ) {
    const width = INIT_TIMEBAR_WIDTH * props.seconds / INIT_SECONDS
    return (
        <svg width={`${width}`} height="18" viewBox={`0 0 ${width} 18`} fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width={`${width}`} height="18" fill="white"/>
            <path d={`M0 2C0 0.89543 0.895431 0 2 0H1192C1193.1 0 ${width} 0.895431 ${width} 2V18H0V2Z`} fill="#81D4FA"/>
        </svg>
    )
}
