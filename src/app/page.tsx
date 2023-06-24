"use client"

import React, { useEffect, useState } from "react"

import PlusSvg from "@/components/plusSvg"
import MinusSvg from "@/components/minusSvg"
import TimeBarSvg from "@/components/timeBarSvg"

export default function Home() {

  // カウントダウンバー
  const [animationClass, setAnimationClass] = useState("")
  const startAnimation = () => {
    setAnimationClass("shrink")
  }

  useEffect(() => {
    if (animationClass == "shrink") {
      const timer = setTimeout(() => {
        setAnimationClass("")
      }, 1200000)
      return () => clearTimeout(timer)
    }
  }, [animationClass])

  // カウントダウンタイマー
  const defaultSeconds = 60 * 20
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(defaultSeconds)
  }

  useEffect(() => {
    let interval = undefined
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)
      if (seconds == 0) {
        clearInterval(interval)
      }
    } else if (!isActive && seconds != 0) {
      clearInterval(interval)
    }

    return ()  => clearInterval(interval)
  }, [isActive, seconds])

  // ストップウォッチ
  const [isSWActive, setSWActive] = useState(false)
  const [sWSeconds, setSWSeconds] = useState(0)
  useEffect(() => {
    let interval = undefined
    if (isSWActive) {
      interval = setInterval(() => {
        setSWSeconds(sWSeconds => sWSeconds + 1)
      }, 1000)
    } else if (!isSWActive && sWSeconds != 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isSWActive, sWSeconds])

  const [countM, setCountM] = useState(0)
  const [countA, setCountA] = useState(0)
  const keyM = "countM"
  const keyA = "countA"

  // 起動時にlocalStorageにデータが存在していればset
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCountM = localStorage.getItem(keyM)
      const savedCountA = localStorage.getItem(keyA)
      const elapsedSeconds = localStorage.getItem("elapsedSeconds")
      if (savedCountM) setCountM(Number(savedCountM))
      if (savedCountA) setCountA(Number(savedCountA))
      if (elapsedSeconds) {
        // const dateTime = Date.parse(elapsedSeconds)

        setSWSeconds(Number(elapsedSeconds))
      }
    }
  }, [])

  // 変更を起点にlocalStorageにset
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(keyM, countM.toString())
    }
  }, [countM])
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(keyA, countA.toString())
    }
  }, [countA])
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("elapsedSeconds", (new Date()).toString())
  //   }
  // }, [sWSeconds])


  const mx = 6
  const boxSize = 24
  const svgSize = 24
  const bgColor = "slate-100"
  const textColor = "text-sky-500"

  return (
    <main>
      <TimeBarSvg animationClass={seconds}/>
      <section className={`flex min-h-screen flex-col items-center justify-between p-12 bg-${bgColor}`}>
        <h2 className={`${textColor} text-[202px] font-bold`}>
          {Math.floor(seconds / 60).toString().padStart(2,"0")}:{(seconds % 60).toString().padStart(2,"0")}
        </h2>
        <section>
          <div className="flex flex-row items-center justify-between mb-14">
            <h3 className="text-6xl font-bold mr-10">宮薗</h3>
            <div onClick={() => {
                setCountM(countM+1)
                setIsActive(true)
                startAnimation()
                reset()
              }} className="mx-3">
              <PlusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold mx-6`}>{countM}</strong>
            <div onClick={() => setCountM(countM-1)} className="mx-3">
              <MinusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold ml-10`}>杯</strong>
          </div>
          <div className="flex flex-row items-center justify-between mb-14">
            <h3 className="text-6xl font-bold mr-10">阿多</h3>
            <div onClick={() => {
                setCountA(countA+1)
                setIsActive(true)
                reset()
                setSWActive(true)
              }} className="mx-3">
              <PlusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold mx-6`}>{countA}</strong>
            <div onClick={() => setCountA(countA-1)} className="mx-3">
              <MinusSvg />
            </div>
            <strong className={`${textColor} text-6xl font-bold ml-10`}>杯</strong>
          </div>
        </section>
        <section className="mb-10">
          <div className="flex flex-col items-center">
            <h4 className={`text-6xl ${textColor} font-bold mb-4`}>
              {Math.floor(sWSeconds / 3600).toString().padStart(2,"0")}:
              {Math.floor(sWSeconds / 60).toString().padStart(2,"0")}:
              {(sWSeconds % 60).toString().padStart(2,"0")}
            </h4>
            <h4 className={`text-4xl ${textColor} font-bold`}>経過</h4>
          </div>
        </section>
      </section>
    </main>
  )
}
