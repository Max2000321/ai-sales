import { useEffect, useRef, useState } from 'react'

/**
 * Counts up from 0 to `target` once, when `shouldStart` first becomes true.
 * After the initial run, target changes (e.g. slider drags) update the value
 * instantly so the control stays responsive.
 */
export function useCountUp(target: number, duration: number = 1500, shouldStart: boolean = false) {
  const [current, setCurrent] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!shouldStart || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const startValue = 0

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCurrent(Math.round(startValue + (target - startValue) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration, shouldStart])

  // After the first animated run, reflect slider changes immediately.
  useEffect(() => {
    if (!startedRef.current) return
    setCurrent(target)
  }, [target])

  return current
}
