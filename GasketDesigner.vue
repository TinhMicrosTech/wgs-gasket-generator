<template>
  <svg :width="size" :height="size" :viewBox="viewBox" style="margin-top:24px;">
    <circle :cx="center" :cy="center" :r="params.outerRadius" fill="none" stroke="black" />
    <circle :cx="center" :cy="center" :r="params.innerRadius" fill="none" stroke="red" />
    <circle
      v-for="(hole, idx) in holes"
      :key="idx"
      :cx="hole.x"
      :cy="hole.y"
      :r="params.holeRadius"
      fill="blue"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({ params: Object })
const size = 400
const center = size / 2
const viewBox = `0 0 ${size} ${size}`

const holes = computed(() => {
  const arr = []
  if (!props.params?.holeCount || props.params.holeCount < 1) return arr
  const angleStep = (2 * Math.PI) / props.params.holeCount
  const r = (props.params.outerRadius + props.params.innerRadius) / 2
  for (let i = 0; i < props.params.holeCount; ++i) {
    const angle = i * angleStep
    arr.push({
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    })
  }
  return arr
})
</script>