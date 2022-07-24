<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

defineProps<{
  state: State
  modelValue?: string
  options: {
    placeholder?: string
    onDelete?: () => void
    onCancel?: () => void
    onSave?: () => void
  }
}>()
</script>

<template>
  <div>
    <input
      autofocus
      class="flex w-full flex-col border-b-2 bg-inherit p-3 focus:outline-none focus:ring"
      :class="[
        state.classes.transition,
        `border-${state.theme.name}-200 text-${state.theme.name}-900 focus:ring-${state.theme.name}-200`,
        `placeholder-${state.theme.name}-400`,
      ]"
      type="text"
      :modelValue="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="options.placeholder"
      @keydown.enter="
        () => {
          if (options.onSave) options.onSave()
        }
      "
    />

    <div class="flex justify-end space-x-2 pt-4">
      <button
        v-if="options.onDelete"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        @click="options.onDelete"
      >
        {{ state.lang.zh ? "删除" : "DELETE" }}
      </button>

      <button
        v-if="options.onCancel"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        @click="options.onCancel"
      >
        {{ state.lang.zh ? "取消" : "CANCEL" }}
      </button>

      <button
        v-if="options.onSave"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        @click="options.onSave"
      >
        {{ state.lang.zh ? "保存" : "SAVE" }}
      </button>
    </div>
  </div>
</template>
