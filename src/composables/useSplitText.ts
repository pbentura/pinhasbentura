import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ref, onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export function useSplitText() {
  const elementRef = ref<HTMLElement | null>(null)
  let splitInstance: SplitType | null = null
  let triggers: ScrollTrigger[] = []

  const splitByWords = (options?: {
    animate?: boolean
    stagger?: number
    duration?: number
    ease?: string
    start?: string
    scrub?: boolean | number
  }) => {
    if (!elementRef.value) return

    const {
      animate = true,
      stagger = 0.05,
      duration = 1,
      ease = 'power2.out',
      start = 'top 80%',
      scrub = false,
    } = options || {}

    splitInstance = new SplitType(elementRef.value, {
      types: 'words',
      tagName: 'span',
    })

    if (animate && splitInstance.words) {
      gsap.set(splitInstance.words, {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
      })

      const tween = gsap.to(splitInstance.words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: elementRef.value,
          start,
          toggleActions: scrub ? 'play reverse play reverse' : 'play none none none',
          scrub,
        },
      })

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger)
      }
    }

    return splitInstance
  }

  const splitByChars = (options?: {
    animate?: boolean
    stagger?: number
    duration?: number
    ease?: string
    start?: string
  }) => {
    if (!elementRef.value) return

    const {
      animate = true,
      stagger = 0.02,
      duration = 0.8,
      ease = 'power2.out',
      start = 'top 85%',
    } = options || {}

    splitInstance = new SplitType(elementRef.value, {
      types: 'chars',
      tagName: 'span',
    })

    if (animate && splitInstance.chars) {
      gsap.set(splitInstance.chars, {
        opacity: 0,
        y: 20,
      })

      const tween = gsap.to(splitInstance.chars, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: elementRef.value,
          start,
          toggleActions: 'play none none none',
        },
      })

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger)
      }
    }

    return splitInstance
  }

  onUnmounted(() => {
    triggers.forEach(trigger => trigger.kill())
    splitInstance?.revert()
    triggers = []
  })

  return {
    elementRef,
    splitByWords,
    splitByChars,
    splitInstance: () => splitInstance,
  }
}
