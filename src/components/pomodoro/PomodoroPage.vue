<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

const state = reactive(new State())

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
