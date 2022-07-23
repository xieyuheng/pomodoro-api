<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"

defineProps<{ state: State }>()
</script>

<template>
  
    <NuxtLink to="/" class="font-logo text-3xl font-bold hover:underline">
      {{ state.appName }}
    </NuxtLink>
  
</template>
