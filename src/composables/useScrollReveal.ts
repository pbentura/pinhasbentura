import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  blur?: number
  scale?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  stagger?: number
  rotateX?: number
}

export function useScrollReveal() {
  const elementRef = ref<HTMLElement | null>(null)
  let trigger: ScrollTrigger | null = null
  let tween: gsap.core.Tween | gsap.core.Timeline | null = null

  const reveal = (options: ScrollRevealOptions = {}) => {
    if (!elementRef.value) return

    const {
      y = 60,
      x = 0,
      opacity = 0,
      blur = 10,
      scale = 1,
      duration = 1.2,
      delay = 0,
      ease = 'power2.out',
      start = 'top 85%',
      end,
      scrub = false,
      markers = false,
      stagger = 0,
      rotateX = 0,
    } = options

    const initialState: gsap.TweenVars = {
      opacity,
      y,
      x,
      scale,
    }

    if (blur > 0) {
      initialState.filter = `blur(${blur}px)`
    }

    if (rotateX !== 0) {
      initialState.rotateX = rotateX
      gsap.set(elementRef.value, { transformPerspective: 1000 })
    }

    gsap.set(elementRef.value, initialState)

    const finalState: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: elementRef.value,
        start,
        end,
        scrub,
        markers,
        toggleActions: scrub ? 'play reverse play reverse' : 'play none none none',
      },
    }

    if (blur > 0) {
      finalState.filter = 'blur(0px)'
    }

    if (rotateX !== 0) {
      finalState.rotateX = 0
    }

    tween = gsap.to(elementRef.value, finalState)

    if (tween.scrollTrigger) {
      trigger = tween.scrollTrigger
    }
  }

  const parallax = (speed: number = 0.5, options: Partial<ScrollRevealOptions> = {}) => {
    if (!elementRef.value) return

    const { start = 'top bottom', end = 'bottom top', scrub = true } = options

    tween = gsap.to(elementRef.value, {
      y: () => window.innerHeight * speed * (speed > 0 ? 1 : -1),
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.value,
        start,
        end,
        scrub: scrub === true ? 1 : scrub,
      },
    })

    if (tween.scrollTrigger) {
      trigger = tween.scrollTrigger
    }
  }

  onUnmounted(() => {
    trigger?.kill()
    tween?.kill()
    trigger = null
    tween = null
  })

  return {
    elementRef,
    reveal,
    parallax,
  }
}
