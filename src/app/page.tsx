"use client"

import React, { useEffect, useState } from "react"

import PlusSvg from "@/components/plusSvg"
import MinusSvg from "@/components/minusSvg"
import TimeBarSvg from "@/components/timeBarSvg"

export default function Home() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("count")
      if (savedCount) setCount(Number(savedCount))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("count", count.toString())
    }
  }, [count])

  const mx = 6
  const boxSize = 24
  const svgSize = 24
  const bgColor = "slate-100"
  const textColor = "text-sky-500"

  return (
    <main>
      <TimeBarSvg />
      <section className={`flex min-h-screen flex-col items-center justify-between p-12 bg-${bgColor}`}>
        <h2 className={`${textColor} text-[202px] font-bold`}>20:00</h2>
        <section>
          <div className="flex flex-row items-center justify-between mb-14">
            <h3 className="text-6xl font-bold mr-10">宮薗</h3>
            <div onClick={() => setCount(count+1)} className="mx-3">
              <PlusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold mx-6`}>{count}</strong>
            <div onClick={() => setCount(count-1)} className="mx-3">
              <MinusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold ml-10`}>杯</strong>
          </div>
          <div className="flex flex-row items-center justify-between mb-14">
            <h3 className="text-6xl font-bold mr-10">阿多</h3>
            <div onClick={() => setCount(count+1)} className="mx-3">
              <PlusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold mx-6`}>{count}</strong>
            <div onClick={() => setCount(count-1)} className="mx-3">
              <MinusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold ml-10`}>杯</strong>
          </div>
        </section>
        <section className="mb-10">
          <div className="flex flex-col items-center">
            <h4 className={`text-6xl ${textColor} font-bold mb-4`}>00:00:00</h4>
            <h4 className={`text-4xl ${textColor} font-bold`}>経過</h4>
          </div>
        </section>
      </section>
    </main>
  )
}
