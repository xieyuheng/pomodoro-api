<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/vue"
import { XIcon, MenuIcon } from "@heroicons/vue/outline/index.js"

defineProps<{ state: State }>()
</script>

<template>
  <Menu as="div" class="relative flex text-3xl">
    <MenuButton>
      <MenuIcon class="h-5 w-5" />
    </MenuButton>

    <Transition
      enter="transition duration-300"
      enterFrom="transform opacity-0 translate-x-6 rotate-45"
      enterTo="transform opacity-100 rotate-0"
      leave="transition duration-300"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0 translate-x-6"
    >
      <MenuItems
        class="fixed top-0 right-0 h-screen w-screen border-4 p-4"
        :class="[`bg-${state.theme.name}-400 border-${state.theme.name}-300`]"
      >
        <div class="flex justify-end">
          <MenuItem v-slot="{ active }">
            <XIcon
              class="h-10 w-10 text-right"
              :class="[
                active && `border-4 border-${state.theme.name}-200`,
                active && `text-${state.theme.name}-200`,
              ]"
            />
          </MenuItem>
        </div>

        <div class="py-10">
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/register"
              class="flex justify-center p-2 font-semibold"
              :class="[
                active && 'underline decoration-6',
                active && `text-${state.theme.name}-200`,
              ]"
            >
              <Lang>
                <template #zh>注册</template>
                <template #en>Register</template>
              </Lang>
            </NuxtLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/login"
              class="flex justify-center p-2 font-semibold"
              :class="[
                active && 'underline decoration-6',
                active && `text-${state.theme.name}-200`,
              ]"
            >
              <Lang>
                <template #zh>登录</template>
                <template #en>Login</template>
              </Lang>
            </NuxtLink>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
