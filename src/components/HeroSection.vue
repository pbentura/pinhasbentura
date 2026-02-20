<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitText } from '../composables/useSplitText'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)
const { elementRef: splitTitleRef, splitByWords } = useSplitText()

onMounted(() => {
  // Animate title word by word
  if (titleRef.value) {
    splitTitleRef.value = titleRef.value
    splitByWords({
      stagger: 0.08,
      duration: 1.2,
      ease: 'power2.out',
      start: 'top 75%',
    })
  }

  // Animate subtitle
  if (subtitleRef.value) {
    gsap.fromTo(subtitleRef.value,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1, 
        delay: 0.8, 
        ease: 'power2.out' 
      }
    )
  }

  // Animate scroll indicator
  if (indicatorRef.value) {
    gsap.fromTo(indicatorRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out' }
    )

    gsap.to(indicatorRef.value.querySelector('.indicator-line'), {
      y: 12,
      duration: 1.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    })
  }
})
</script>

<template>
  <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div class="text-center px-6 md:px-12 max-w-6xl mx-auto">
      <h1 
        ref="titleRef"
        class="text-display-xl font-light text-text-primary mb-8 will-change-transform"
      >
        Pinhas Bentura
      </h1>
      
      <p 
        ref="subtitleRef"
        class="text-body-lg text-text-secondary font-light tracking-wide opacity-0"
      >
        Développeur créatif
      </p>
    </div>

    <!-- Scroll Indicator -->
    <div 
      ref="indicatorRef"
      class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
    >
      <span class="text-caption text-text-muted uppercase tracking-widest">Scroll</span>
      <div class="w-px h-12 bg-text-muted/30 relative overflow-hidden">
        <div class="indicator-line w-full h-4 bg-text-primary/60 absolute top-0" />
      </div>
    </div>
  </section>
</template>
