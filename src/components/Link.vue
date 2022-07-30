<script setup lang="ts">
// We can not use <NuxtLink> with headlessui:
// - https://headlessui.com/react/menu#integrating-with-next-js

const router = useRouter()

defineProps<{ href?: string; target?: string }>()
</script>

<template>
  <a @click="href && router.push({ path: href })" :target="target">
    <slot />
  </a>
</template>
