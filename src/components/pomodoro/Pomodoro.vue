<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"
import PomodoroTimer from "./PomodoroTimer.vue"
import PomodoroTasks from "./PomodoroTasks.vue"

const state = new State()

onMounted(() => state.setupNotification())
</script>

<template>
  <div>
    <Head>
      <Title>{{ state.formatTitle() }}</Title>
      <Meta name="theme-color" :content="state.theme.color" />
    </Head>

    <PomodoroTimer :state="state" />
    <PomodoroTasks :state="state" />
  </div>
</template>
