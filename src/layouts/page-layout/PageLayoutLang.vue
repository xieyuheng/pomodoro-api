<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/vue"
import {
  TranslateIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/vue/outline/index.js"

defineProps<{ state: State }>()
</script>

<template>
  <Listbox as="div" class="relative flex text-xl" v-model="state.lang.tag">
    <ListboxButton class="flex items-center font-semibold">
      <Lang>
        <template #zh>语言</template>
        <template #en>Lang</template>
      </Lang>

      <SelectorIcon class="h-5 w-5" />
    </ListboxButton>

    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <ListboxOptions
        class="absolute top-8 right-0 min-w-max border-2"
        :class="[`bg-${state.theme.name}-400 border-${state.theme.name}-300`]"
      >
        <ListboxOption
          v-slot="{ active, selected }"
          v-for="tag of state.lang.tags"
          :key="tag"
          :value="tag"
        >
          <div
            class="flex min-w-max items-center p-2"
            :class="[active && `bg-${state.theme.name}-500`]"
          >
            {{ state.lang.findTagName(tag) }}
            <CheckIcon v-if="selected" class="ml-2 h-5 w-5" />
          </div>
        </ListboxOption>
      </ListboxOptions>
    </Transition>
  </Listbox>
</template>
