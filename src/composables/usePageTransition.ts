import { ref } from 'vue'
import { gsap } from 'gsap'

interface TransitionState {
  isAnimating: boolean
  projectImage: string
  projectTitle: string
}

const state = ref<TransitionState>({
  isAnimating: false,
  projectImage: '',
  projectTitle: '',
})

export function usePageTransition() {
  const startTransition = async (
    event: MouseEvent,
    projectImage: string,
    projectTitle: string,
    targetUrl: string
  ): Promise<void> => {
    if (state.value.isAnimating) return

    state.value.isAnimating = true
    state.value.projectImage = projectImage
    state.value.projectTitle = projectTitle

    const x = event.clientX
    const y = event.clientY

    // Create transition overlay
    const overlay = document.createElement('div')
    overlay.className = 'page-transition-overlay'
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `

    // Create circular mask container
    const maskContainer = document.createElement('div')
    maskContainer.className = 'transition-mask'
    maskContainer.style.cssText = `
      position: absolute;
      inset: 0;
      clip-path: circle(0% at ${x}px ${y}px);
      will-change: clip-path;
    `

    // Create expanded project image background
    const imageBg = document.createElement('div')
    imageBg.style.cssText = `
      position: absolute;
      inset: 0;
      background-image: url(${projectImage});
      background-size: cover;
      background-position: center;
      transform: scale(1.2);
      will-change: transform;
    `

    // Create dark vignette overlay
    const vignette = document.createElement('div')
    vignette.style.cssText = `
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%);
    `

    // Create content container
    const content = document.createElement('div')
    content.className = 'transition-content'
    content.style.cssText = `
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      opacity: 0;
      transform: translateY(30px);
      will-change: opacity, transform;
    `

    // Project title
    const title = document.createElement('h2')
    title.textContent = projectTitle
    title.style.cssText = `
      font-size: clamp(2rem, 8vw, 6rem);
      font-weight: 300;
      color: white;
      letter-spacing: -0.02em;
      text-align: center;
      text-shadow: 0 4px 30px rgba(0,0,0,0.5);
    `

    // Loading indicator
    const loadingContainer = document.createElement('div')
    loadingContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 1rem;
      opacity: 0;
    `

    const loadingText = document.createElement('span')
    loadingText.textContent = 'Ouverture'
    loadingText.style.cssText = `
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: rgba(255,255,255,0.8);
    `

    // Animated dots
    const dots = document.createElement('div')
    dots.style.cssText = `
      display: flex;
      gap: 0.5rem;
    `

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span')
      dot.style.cssText = `
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: white;
        opacity: 0.4;
      `
      dots.appendChild(dot)
    }

    loadingContainer.appendChild(loadingText)
    loadingContainer.appendChild(dots)
    content.appendChild(title)
    content.appendChild(loadingContainer)

    maskContainer.appendChild(imageBg)
    maskContainer.appendChild(vignette)
    maskContainer.appendChild(content)
    overlay.appendChild(maskContainer)
    document.body.appendChild(overlay)

    // Animation timeline
    const tl = gsap.timeline()

    // Calculate diagonal to ensure circle covers entire screen
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
    const circleRadius = (diagonal / Math.min(window.innerWidth, window.innerHeight)) * 100

    // Phase 1: Expand circle from click point (majestic entrance)
    tl.to(maskContainer, {
      clipPath: `circle(${circleRadius * 1.5}% at ${x}px ${y}px)`,
      duration: 1.2,
      ease: 'power4.inOut',
    })
    .to(imageBg, {
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
    }, 0)
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.4)
    .to(loadingContainer, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.6)

    // Animate loading dots
    const dotElements = dots.querySelectorAll('span')
    dotElements.forEach((dot, i) => {
      gsap.to(dot, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        delay: i * 0.15,
        ease: 'power2.inOut',
      })
    })

    // Wait then redirect
    await new Promise((resolve) => setTimeout(resolve, 1800))

    // Phase 2: Flash transition before redirect
    const flash = document.createElement('div')
    flash.style.cssText = `
      position: absolute;
      inset: 0;
      background: white;
      opacity: 0;
      pointer-events: none;
    `
    overlay.appendChild(flash)

    await gsap.to(flash, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.in',
    })

    // Redirect
    window.open(targetUrl, '_blank')

    // Phase 3: Close transition (when user comes back)
    await gsap.to(flash, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    })

    await gsap.to(maskContainer, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      duration: 0.8,
      ease: 'power4.inOut',
    })

    // Cleanup
    gsap.killTweensOf(dotElements)
    overlay.remove()
    state.value.isAnimating = false
  }

  return {
    startTransition,
    isAnimating: () => state.value.isAnimating,
  }
}
