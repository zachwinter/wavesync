import ease from './easing'
import { interpolate } from 'd3-interpolate'

export function timer (duration = 500, tick, easing = 'easeOutQuint') {
  if (typeof tick !== 'function') throw new Error('You must provide a "tick" handler.')
  
  const start = (typeof window !== 'undefined') ? window.performance.now() : Date.now()
  let active = true

  const go = (timestamp) => {
    if (active === false) return 
    
    const elapsed = (typeof window !== 'undefined' ? timestamp : Date.now()) - start
    const progress = ease(Math.min(elapsed / duration, 1), easing)

    tick({
      timestamp,
      elapsed,
      progress,
      finished: progress === 1
    })

    if (progress < 1) requestAnimationFrame(go)
  }
 
  requestAnimationFrame(go)

  return {
    stop () {
      active = false
    }
  }
}

/**
 * @function tween – Interpolate two values over a fixed duration.
 */
export function tween (a, b, duration = 500, tick) {
  const i = interpolate(a, b)
  return timer(duration, ({ timestamp, elapsed, progress, finished }) => {
    tick({
      timestamp,
      elapsed,
      progress,
      finished,
      value: i(ease(progress))
    })
  })
}

export function pause (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}
