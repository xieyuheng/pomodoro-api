<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
import PageLayoutHeader from "./PageLayoutHeader.vue"

const state = reactive(new State())
await state.auth.loadUser()

const headers = useRequestHeaders(["cookie"])
console.log(headers.cookie)
</script>

<template>
  <div>
    <Head>
      <Title v-if="state.formatTitle()">{{ state.formatTitle() }}</Title>
      <Meta name="theme-color" :content="state.theme.color" />
    </Head>

    <div
      class="flex min-h-screen flex-col items-center"
      :class="[
        state.classes.transition,
        `bg-${state.theme.name}-400 text-${state.theme.name}-100`,
      ]"
    >
      <PageLayoutHeader :state="state" />

      <div class="mt-6 h-full w-full space-y-2 px-4 md:max-w-2xl">
        <slot />
      </div>
    </div>
  </div>
</template>
