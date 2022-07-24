<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

defineProps<{ state: State }>()
</script>

<template>
  <div>PomodoroTimerButton</div>
</template>
