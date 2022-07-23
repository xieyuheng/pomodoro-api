<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"

defineProps<{ state: State }>()
</script>

<template>
  <NuxtLink to="/" class="font-logo text-3xl font-bold hover:underline">
    <Lang>
      <template #zh> 番茄钟 </template>
      <template #en> Pomodoro </template>
    </Lang>
  </NuxtLink>
</template>
