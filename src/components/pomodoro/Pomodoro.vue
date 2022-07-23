<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

const state = new State()
</script>

<template>
  <div>{{ state.json() }}</div>
</template>
