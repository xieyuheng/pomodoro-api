<script setup lang="ts">
// We can not use <Link> with headlessui:
// - https://headlessui.com/react/menu#integrating-with-next-js

defineProps<{ href: string; target: string }>()

const router = useRouter()
</script>

<template>
  <a @click="router.push({ path: href })" :target="target">
    <slot />
  </a>
</template>
