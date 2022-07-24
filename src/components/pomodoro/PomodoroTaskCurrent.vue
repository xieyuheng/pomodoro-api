<script setup lang="ts">
import { PomodoroState as State } from "./PomodoroState"
import { Task } from "./models/Task"
import { DotsVerticalIcon } from "@heroicons/vue/outline/index.js"
import PomodoroTaskItemCount from "./PomodoroTaskItemCount.vue"
import PomodoroTaskForm from "./PomodoroTaskForm.vue"

const props = defineProps<{ state: State; task: Task }>()

const inputTitle = ref(props.task.title)
</script>

<template>
  <div
    class="flex flex-col border-2 bg-white p-3 md:py-4 text-2xl font-semibold"
    :class="[
      state.classes.transition,
      `border-${state.theme.name}-300 text-${state.theme.name}-900`,
    ]"
  >
    <PomodoroTaskForm
      v-if="task.editing"
      :state="state"
      v-model="inputTitle"
      :onDelete="
        () => {
          state.deleteTask(task.id)
          if (state.currentTesk) {
            setInputTitle(state.currentTesk.title)
          }
          task.editing = false
        }
      "
      :onCancel="
        () => {
          setInputTitle(task.title)
          task.editing = false
        }
      "
      :onSave="
        () => {
          if (!inputTitle) {
            return alert(state.lang.zh ? '输入不能为空' : 'Input required')
          }

          task.title = inputTitle
          task.editing = false
        }
      "
    />

    <div v-else class="flex items-start justify-between">
      <div class="text-2xl font-semibold">{{ task.title }}</div>

      <button
        class="shrink-0"
        @click="
          () => {
            task.editing = true
          }
        "
      >
        <DotsVerticalIcon class="h-6 w-6" />
      </button>
    </div>

    <PomodoroTaskItemCount :state="state" :task="task" />
  </div>
</template>
