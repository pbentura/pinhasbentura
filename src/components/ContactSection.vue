<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (contentRef.value) {
    gsap.fromTo(contentRef.value,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }

  if (buttonRef.value) {
    gsap.fromTo(buttonRef.value,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        delay: 0.3,
      }
    )
  }
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="relative min-h-screen w-full flex items-center justify-center py-32"
  >
    <div 
      ref="contentRef"
      class="text-center px-6 max-w-3xl mx-auto opacity-0"
    >
      <h2 class="text-display-md font-light text-text-primary mb-6">
        Créons quelque chose
      </h2>
      <p class="text-body text-text-secondary mb-16">
        Une idée, un projet ?
      </p>

      <a 
        ref="buttonRef"
        href="mailto:hello@example.com"
        class="group relative inline-flex items-center justify-center px-16 py-6 
               bg-text-primary text-bg-primary text-body font-medium
               transition-all duration-700 ease-premium
               hover:scale-[1.03] hover:opacity-90
               opacity-0"
      >
        <span class="relative z-10">Démarrer un projet</span>
      </a>

      <div class="mt-24 flex flex-col gap-4 text-caption text-text-muted">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener"
          class="hover:text-text-primary transition-colors duration-500"
        >
          GitHub
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener"
          class="hover:text-text-primary transition-colors duration-500"
        >
          LinkedIn
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener"
          class="hover:text-text-primary transition-colors duration-500"
        >
          Twitter
        </a>
      </div>
    </div>
  </section>
</template>
