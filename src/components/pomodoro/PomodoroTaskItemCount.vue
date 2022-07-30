<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"
import { Task } from "./models/Task"

const props = defineProps<{ state: State; task: Task }>()

const records = computed(() =>
  Array.from({ length: props.task.count }, (_, index) => ({ index }))
)
</script>

<template>
  <div v-if="task.count > 0" class="flex space-x-0.5 pt-2">
    <div
      v-for="record of records" :key="record.index"
      class="h-2.5 w-2.5 border"
      :class="[
        state.classes.transition,
        `border-${state.theme.name}-400 bg-${state.theme.name}-600`,
      ]"
      :key="record.index"
    ></div>
  </div>
</template>
