<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  description: string
  image: string
  year: string
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Aura',
    description: 'Plateforme immersive de bien-être digital',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop',
    year: '2024',
    link: '#project-aura',
  },
  {
    id: 2,
    title: 'Nebula',
    description: 'Application de visualisation de données spatiales',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&auto=format&fit=crop',
    year: '2024',
    link: '#project-nebula',
  },
  {
    id: 3,
    title: 'Prism',
    description: 'Expérience e-commerce nouvelle génération',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop',
    year: '2023',
    link: '#project-prism',
  },
]

const projectRefs = ref<HTMLElement[]>([])
const imageRefs = ref<HTMLElement[]>([])

onMounted(() => {
  projectRefs.value.forEach((project, index) => {
    // Project content reveal
    gsap.fromTo(project.querySelector('.project-content'),
      { opacity: 0, y: 80, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: project,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Image reveal
    const image = project.querySelector('.project-image')
    if (image) {
      gsap.fromTo(image,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  })
})
</script>

<template>
  <section class="relative w-full">
    <div 
      v-for="(project, index) in projects"
      :key="project.id"
      :ref="(el) => { if (el) projectRefs[index] = el as HTMLElement }"
      class="relative min-h-screen w-full flex items-center py-24"
    >
      <div class="w-full max-w-7xl mx-auto px-6 md:px-12">
      <a :href="project.link" class="block">
        <div 
          class="bg-bg-secondary rounded-3xl overflow-hidden border border-text-muted/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-text-muted/10"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
            <!-- Image -->
            <div 
              class="project-image relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden"
              :class="index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
            >
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <!-- Content -->
            <div 
              class="project-content flex flex-col gap-6 p-10 lg:p-16 text-center lg:text-left"
              :class="index % 2 === 0 ? 'lg:order-2' : 'lg:order-1 lg:text-right lg:items-end'"
            >
              <span class="text-caption text-text-muted">{{ project.year }}</span>
              <h2 class="text-display-lg font-light text-text-primary">
                {{ project.title }}
              </h2>
              <p class="text-body text-text-secondary max-w-md">
                {{ project.description }}
              </p>
              <button 
                class="mt-4 text-caption text-text-primary uppercase tracking-widest 
                       hover:opacity-60 transition-opacity duration-500 
                       flex items-center gap-3 group"
                :class="index % 2 === 0 ? '' : 'lg:flex-row-reverse'"
              >
<!--                <span>Voir le projet</span>-->
<!--                <svg -->
<!--                  class="w-4 h-4 transform transition-transform duration-500 group-hover:translate-x-1"-->
<!--                  :class="index % 2 === 0 ? '' : 'lg:rotate-180 lg:group-hover:-translate-x-1'"-->
<!--                  fill="none" -->
<!--                  viewBox="0 0 24 24" -->
<!--                  stroke="currentColor"-->
<!--                >-->
<!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />-->
<!--                </svg>-->
              </button>
            </div>
          </div>
        </div>
      </a>
      </div>
    </div>
  </section>
</template>
