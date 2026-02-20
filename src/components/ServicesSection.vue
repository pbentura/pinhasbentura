<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const phrasesRef = ref<HTMLElement[]>([])

const phrases = [
  "Je conçois des applications réellement utilisées",
  "Je simplifie les interfaces pour aller à l’essentiel",
  "Je rends les systèmes fiables et maintenables",
  "J’automatise ce qui ne devrait plus être fait à la main",
]

onMounted(() => {
  if (!sectionRef.value) return

  phrasesRef.value.forEach((phrase, index) => {
    gsap.fromTo(phrase,
      { 
        opacity: 0, 
        y: 60,
        filter: 'blur(12px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: phrase,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        delay: index * 0.15,
      }
    )
  })
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="relative min-h-screen w-full flex items-center justify-center py-32"
  >
    <div class="w-full max-w-6xl mx-auto px-6 md:px-12">
      <div class="flex flex-col gap-16 md:gap-24">
        <div 
          v-for="(phrase, index) in phrases"
          :key="index"
          :ref="(el) => { if (el) phrasesRef[index] = el as HTMLElement }"
          class="opacity-0"
        >
          <p class="text-display-md font-light text-text-primary text-center">
            {{ phrase }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
