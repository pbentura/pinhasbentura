<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageTransition } from '../composables/usePageTransition'
import { ThreeDCardContainer, ThreeDCardBody, ThreeDCardItem } from './ui/ThreeDCard.vue'

gsap.registerPlugin(ScrollTrigger)

const { startTransition, isAnimating } = usePageTransition()

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
    title: 'Ventura',
    description: 'Plateforme SaaS tout-en-un pour la gestion d\'activité des artisans et TPE. Facturation et suivi client intuitif.',
    image: '/projects/ventura.png',
    year: '2024',
    link: 'https://ventura-e277f.web.app',
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

const cardRefs = ref<HTMLElement[]>([])

const handleProjectClick = async (event: MouseEvent, project: Project) => {
  if (isAnimating()) return

  // Check if it's an external URL
  if (project.link.startsWith('http') || project.link.startsWith('https')) {
    event.preventDefault()
    await startTransition(event, project.image, project.title, project.link)
  }
  // Internal anchors work normally
}

onMounted(() => {
  cardRefs.value.forEach((card, index) => {
    if (!card) return
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  })
})
</script>

<template>
  <section class="relative w-full py-32 md:py-40">
    <!-- Section header -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 mb-20">
      <h2 class="text-display-lg font-light text-text-primary text-center">
        Projets
      </h2>
      <p class="text-body text-text-secondary text-center mt-4 max-w-lg mx-auto">
        Une sélection de projets récents alliant design et performance.
      </p>
    </div>

    <!-- Cards grid -->
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :ref="(el) => { if (el) cardRefs[index] = el as HTMLElement }"
        >
          <a
            :href="project.link"
            class="block cursor-pointer"
            @click="(e) => handleProjectClick(e, project)"
          >
            <ThreeDCardContainer container-class="w-full">
              <ThreeDCardBody class="w-full h-auto rounded-2xl p-5 border border-text-muted/15 bg-bg-secondary group/card">

                <!-- Year badge -->
                <ThreeDCardItem
                  :translateZ="30"
                  class="w-full"
                >
                  <span class="text-caption text-text-muted tracking-widest uppercase">
                    {{ project.year }}
                  </span>
                </ThreeDCardItem>

                <!-- Title -->
                <ThreeDCardItem
                  :translateZ="50"
                  class="mt-3 w-full"
                >
                  <h3 class="text-display-md font-light text-text-primary">
                    {{ project.title }}
                  </h3>
                </ThreeDCardItem>

                <!-- Description -->
                <ThreeDCardItem
                  as="p"
                  :translateZ="40"
                  class="text-body text-text-secondary mt-2 w-full"
                >
                  {{ project.description }}
                </ThreeDCardItem>

                <!-- Image -->
                <ThreeDCardItem :translateZ="80" class="w-full mt-5">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="h-52 w-full object-cover rounded-xl transition-shadow duration-500 group-hover/card:shadow-xl group-hover/card:shadow-text-muted/10"
                    loading="lazy"
                  />
                </ThreeDCardItem>

                <!-- Footer -->
                <div class="flex justify-between items-center mt-6">
                  <ThreeDCardItem
                    :translateZ="20"
                    class="text-caption text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    Voir le projet →
                  </ThreeDCardItem>
                </div>

              </ThreeDCardBody>
            </ThreeDCardContainer>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
