<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

const state = new State()
</script>

<template>
  <pre>{{ state.json() }}</pre>
</template>
