<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

defineProps<{ state: State }>()
</script>

<template>
  <div>PomodoroTaskItemCount</div>
</template>
