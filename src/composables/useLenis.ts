import Lenis from 'lenis'


let lenis: Lenis | null = null

export function useLenis() {
  const initLenis = () => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  const destroyLenis = () => {
    lenis?.destroy()
    lenis = null
  }

  const scrollTo = (target: string | number, options?: object) => {
    lenis?.scrollTo(target, options)
  }

  return {
    initLenis,
    destroyLenis,
    scrollTo,
    lenis: () => lenis,
  }
}
