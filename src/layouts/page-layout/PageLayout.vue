<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
</script>

<template>
  <div>
    <Lang>
      <template #zh> 中文 </template>
      <template #en> PageLayout </template>
    </Lang>

    <slot />
  </div>
</template>
