<script setup lang="ts">
import { LoginState as State } from "./LoginState"
import {
  DotsCircleHorizontalIcon,
  ArrowCircleRightIcon,
} from "@heroicons/vue/outline/index.js"

defineProps<{ state: State }>()

const processing = ref(false)

const form = {
  email: "todo",
  processing: false,
  errors: {
    email: "todo",
  },
}

async function handleSubmit(event: Event, state: State) {
  processing.value = true

  const target = event.target as typeof event.target & {
    email: { value: string }
  }

  const email = target.email.value

  state.verify(
    await $fetch("/api/login", {
      method: "POST",
      body: { email },
    })
  )

  processing.value = false
}
</script>

<template>
  <form
    @submit.prevent="(event) => handleSubmit(event, state)"
    class="flex w-full flex-col pt-20 space-y-2 text-xl sm:w-auto"
  >
    <div class="flex flex-col pb-2">
      <div class="flex items-baseline justify-between">
        <div class="font-logo text-3xl font-semibold">
          <Lang>
            <template #zh> 登录 </template>
            <template #en> Login </template>
          </Lang>
        </div>

        <div class="text-xl">
          <Lang>
            <template #zh>
              尚未<Link href="/register" class="underline">注册</Link>？
            </template>
            <template #en>
              Not yet
              <Link href="/register" class="underline">Registered</Link>?
            </template>
          </Lang>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex">
        <input
          id="email"
          name="email"
          autocomplete="email"
          class="w-full rounded-sm border px-3 py-4 font-bold placeholder-opacity-60"
          :class="[
            `text-${state.theme.name}-700`,
            `border-${state.theme.name}-600`,
            `placeholder-${state.theme.name}-800`,
          ]"
          type="email"
          maxlength="100"
          :placeholder="state.lang.zh ? '电子邮箱' : 'Email'"
          spellcheck="false"
          required
          v-model.trim="form.email"
        />

        <button
          class="pl-2"
          :class="[
            form.processing
              ? `text-${state.theme.name}-300`
              : `text-${state.theme.name}-100`,
          ]"
          type="submit"
          :disabled="form.processing"
        >
          <ArrowCircleRightIcon v-if="!form.processing" class="h-8 w-8" />
          <DotsCircleHorizontalIcon v-if="form.processing" class="h-8 w-8" />
        </button>
      </div>

      <div v-if="form.errors.email" class="text-xm py-1 text-orange-500">
        {{ form.errors.email }}
      </div>
    </div>
  </form>
</template>
