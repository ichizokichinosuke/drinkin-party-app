"use client"

import React, { useEffect, useState } from "react"

import PlusSvg from "@/components/plusSvg"
import MinusSvg from "@/components/minusSvg"
import TimeBarSvg from "@/components/timeBarSvg"
import { INIT_SECONDS } from "@/lib/constants"
import { alermDisplay, stopWatchDisplay } from "@/services/timeDisplay"

export default function Home() {

  // カウントダウンタイマー
  const [seconds, setSeconds] = useState(INIT_SECONDS)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(INIT_SECONDS)
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined = undefined
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
    let interval: string | number | NodeJS.Timeout | undefined = undefined
    if (isSWActive) {
      interval = setInterval(() => {
        setSWSeconds(sWSeconds => sWSeconds + 1)
      }, 1000)
    } else if (!isSWActive && sWSeconds != 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isSWActive, sWSeconds])

  function handleSW() {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("elapsedSeconds")) {
        const nowTime = (new Date()).getTime()
        localStorage.setItem("elapsedSeconds", nowTime.toString())
      }
    }
    setSWActive(true)
  }

  // 杯数管理
  const [countM, setCountM] = useState(0)
  const [countA, setCountA] = useState(0)
  const keyM = "countM"
  const keyA = "countA"

  // ブラウザリロード時にフック
  // 起動時にlocalStorageにデータが存在していればset
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCountM = localStorage.getItem(keyM)
      const savedCountA = localStorage.getItem(keyA)
      const elapsedSeconds = localStorage.getItem("elapsedSeconds")
      if (savedCountM) setCountM(Number(savedCountM))
      if (savedCountA) setCountA(Number(savedCountA))
      if (elapsedSeconds) {
        // elaplseSeconds: ms
        const nowTime = (new Date()).getTime()
        setSWSeconds(Math.round((nowTime - Number(elapsedSeconds)) / 1000))
        setSWActive(true)
      }
    }
  }, [])

  // count変数の変更をフックにlocalStorageにset
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

  const bgColor = "slate-100"
  const textColor = "text-sky-500"

  function plusButtonOnClick(count: number, setCount: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: number): void }) {
    setCount(count+1)
    setIsActive(true)
    reset()
    handleSW()
  }

  return (
    <main>
      <TimeBarSvg seconds={seconds}/>
      <section className={`flex min-h-screen flex-col items-center justify-between p-12 bg-${bgColor}`}>
        <h2 className={`${textColor} text-[202px] font-bold`}>
          {alermDisplay(seconds)}
        </h2>
        <section>
          <div className="flex flex-row items-center justify-between mb-14">
            <h3 className="text-6xl font-bold mr-10">宮薗</h3>
            <div onClick={() => plusButtonOnClick(countM, setCountM)} className="mx-3">
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
            <div onClick={() => plusButtonOnClick(countA, setCountA)} className="mx-3">
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
              {stopWatchDisplay(sWSeconds)}
            </h4>
            <h4 className={`text-4xl ${textColor} font-bold`}>経過</h4>
          </div>
        </section>
      </section>
    </main>
  )
}
