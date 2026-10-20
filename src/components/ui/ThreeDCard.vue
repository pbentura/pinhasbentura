<script lang="ts">
import {
  defineComponent,
  h,
  ref,
  provide,
  inject,
  onMounted,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'

// ── Injection key for mouse-entered state ──
const MouseEnteredKey: InjectionKey<Ref<boolean>> = Symbol('MouseEntered')

// ─────────────────────────────────────────────
// CardContainer
// ─────────────────────────────────────────────
export const ThreeDCardContainer = defineComponent({
  name: 'ThreeDCardContainer',
  props: {
    containerClass: { type: String, default: '' },
    cardClass: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const containerRef = ref<HTMLDivElement | null>(null)
    const isMouseEntered = ref(false)

    provide(MouseEnteredKey, isMouseEntered)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.value) return
      const { left, top, width, height } = containerRef.value.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) / 25
      const y = (e.clientY - top - height / 2) / 25
      containerRef.value.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    }

    const handleMouseEnter = () => {
      isMouseEntered.value = true
    }

    const handleMouseLeave = () => {
      isMouseEntered.value = false
      if (containerRef.value) {
        containerRef.value.style.transform = `rotateY(0deg) rotateX(0deg)`
      }
    }

    return () =>
      h(
        'div',
        {
          class: ['flex items-center justify-center', props.containerClass],
          style: { perspective: '1000px' },
        },
        [
          h(
            'div',
            {
              ref: containerRef,
              class: [
                'flex items-center justify-center relative transition-all duration-200 ease-linear',
                props.cardClass,
              ],
              style: { transformStyle: 'preserve-3d' },
              onMouseenter: handleMouseEnter,
              onMousemove: handleMouseMove,
              onMouseleave: handleMouseLeave,
            },
            slots.default?.()
          ),
        ]
      )
  },
})

// ─────────────────────────────────────────────
// CardBody
// ─────────────────────────────────────────────
export const ThreeDCardBody = defineComponent({
  name: 'ThreeDCardBody',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: [
            '[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
            props.class,
          ],
        },
        slots.default?.()
      )
  },
})

// ─────────────────────────────────────────────
// CardItem
// ─────────────────────────────────────────────
export const ThreeDCardItem = defineComponent({
  name: 'ThreeDCardItem',
  props: {
    as: { type: String, default: 'div' },
    translateX: { type: [Number, String], default: 0 },
    translateY: { type: [Number, String], default: 0 },
    translateZ: { type: [Number, String], default: 0 },
    rotateX: { type: [Number, String], default: 0 },
    rotateY: { type: [Number, String], default: 0 },
    rotateZ: { type: [Number, String], default: 0 },
    class: { type: String, default: '' },
  },
  setup(props, { slots, attrs }) {
    const itemRef = ref<HTMLElement | null>(null)
    const isMouseEntered = inject(MouseEnteredKey, ref(false))

    const applyTransform = () => {
      if (!itemRef.value) return
      if (isMouseEntered.value) {
        itemRef.value.style.transform = `translateX(${props.translateX}px) translateY(${props.translateY}px) translateZ(${props.translateZ}px) rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg) rotateZ(${props.rotateZ}deg)`
      } else {
        itemRef.value.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
      }
    }

    watch(isMouseEntered, applyTransform)
    onMounted(applyTransform)

    return () =>
      h(
        props.as,
        {
          ref: itemRef,
          class: ['w-fit transition duration-200 ease-linear', props.class],
          ...attrs,
        },
        slots.default?.()
      )
  },
})

export default ThreeDCardContainer
</script>
