<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"

defineProps<{
  state: State
  placeholder?: string
  onChange: (event: any) => void
  onDelete?: () => void
  onCancel?: () => void
  onSave?: () => void
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
      :placeholder="placeholder"
      :onChange="onChange"
      :onKeyDown="
        (event) => {
          if (event.key === 'Enter') {
            if (onSave) onSave()
          }
        }
      "
    />

    <div class="flex justify-end space-x-2 pt-4">
      <button
        v-if="onDelete"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        :onClick="onDelete"
      >
        {{ state.lang.zh ? "删除" : "DELETE" }}
      </button>

      <button
        v-if="onCancel"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        :onClick="onCancel"
      >
        {{ state.lang.zh ? "取消" : "CANCEL" }}
      </button>

      <button
        v-if="onSave"
        class="border-2 py-1 px-2 text-lg font-semibold md:text-xl"
        :class="[
          state.classes.transition,
          `border-${state.theme.name}-300 bg-${state.theme.name}-200 text-${state.theme.name}-600`,
        ]"
        :onClick="onSave"
      >
        {{ state.lang.zh ? "保存" : "SAVE" }}
      </button>
    </div>
  </div>
</template>
