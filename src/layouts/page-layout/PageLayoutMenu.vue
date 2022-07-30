<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/vue"
import { MenuIcon } from "@heroicons/vue/outline/index.js"
import { useAuth } from "@/composables/useAuth"

defineProps<{ state: State }>()

const auth = ref(null)

onMounted(async () => {
  auth.value = await useAuth()
})
</script>

<template>
  <Menu as="div" class="relative flex text-xl">
    <MenuButton>
      <MenuIcon class="h-5 w-5" />
    </MenuButton>

    <MenuItems
      class="absolute top-8 right-0 min-w-max border-2"
      :class="[`bg-${state.theme.name}-400 border-${state.theme.name}-300`]"
    >
      <MenuItem v-slot="{ active }">
        <div
          v-if="auth?.user"
          class="flex min-w-max items-center p-2"
          :class="[active && `bg-${state.theme.name}-500`]"
        >
          @{{ auth.user.username }}
        </div>
      </MenuItem>
      <MenuItem v-slot="{ active }">
        <button
          class="flex min-w-max items-center p-2"
          :class="[active && `bg-${state.theme.name}-500`]"
          @click="auth?.logout()"
        >
          Logout
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
