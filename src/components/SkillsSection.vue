<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const skillRefs = ref<HTMLElement[]>([])

const skills = [
  { text: 'Vue.js', x: 15, y: 20, size: 'xl' },
  { text: 'APIs', x: 70, y: 25, size: 'xl' },
  { text: 'Architecture', x: 35, y: 55, size: 'lg' },
  { text: 'Symfony', x: 60, y: 40, size: 'lg' },
  { text: 'React', x: 25, y: 35, size: 'lg' },
  { text: 'Docker', x: 75, y: 55, size: 'md' },
  { text: 'CI/CD', x: 85, y: 15, size: 'md' },
  { text: 'Automatisation', x: 10, y: 70, size: 'md' },
  { text: 'n8n', x: 50, y: 10, size: 'md' }, // ajouté en haut centre
  { text: 'FastAPI', x: 50, y: 20, size: 'md' },
  { text: 'SEO', x: 25, y: 50, size: 'sm' },
  { text: 'Maintenabilité', x: 5, y: 35, size: 'sm' },
  { text: 'Base de données', x: 50, y: 80, size: 'sm' },
]

onMounted(() => {
  skillRefs.value.forEach((skill, index) => {
    const xOffset = (Math.random() - 0.5) * 30
    const yOffset = (Math.random() - 0.5) * 20
    
    gsap.fromTo(skill,
      { 
        opacity: 0, 
        x: xOffset,
        y: yOffset + 40,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        delay: index * 0.08,
      }
    )

    // Gentle floating animation
    gsap.to(skill, {
      y: 'random(-15, 15)',
      x: 'random(-10, 10)',
      duration: 'random(3, 5)',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 0.2,
    })
  })
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="(skill, index) in skills"
        :key="index"
        :ref="(el) => { if (el) skillRefs[index] = el as HTMLElement }"
        class="absolute opacity-0 select-none"
        :style="{
          left: `${skill.x}%`,
          top: `${skill.y}%`,
        }"
      >
        <span 
          class="font-light text-text-primary whitespace-nowrap hover:text-text-secondary transition-colors duration-700 cursor-default"
          :class="{
            'text-display-lg': skill.size === 'xl',
            'text-display-md': skill.size === 'lg',
            'text-body-lg': skill.size === 'md',
            'text-body': skill.size === 'sm',
          }"
        >
          {{ skill.text }}
        </span>
      </div>
    </div>

    <div class="relative z-10 text-center px-6">
      <h2 class="text-caption text-text-muted uppercase tracking-widest mb-4 opacity-60">
        Compétences
      </h2>
    </div>
  </section>
</template>
