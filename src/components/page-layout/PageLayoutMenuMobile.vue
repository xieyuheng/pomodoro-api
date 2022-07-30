<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { MenuIcon, XIcon } from "@heroicons/vue/outline/index.js"
import { PageLayoutState as State } from "./PageLayoutState"

defineProps<{ state: State }>()
</script>

<template>
  <Menu as="div" class="relative flex text-3xl">
    <MenuButton>
      <MenuIcon class="h-5 w-5" />
    </MenuButton>

    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="transform opacity-0 translate-x-6 rotate-45"
      enter-to-class="transform opacity-100 rotate-0"
      leave-active-class="transition duration-300"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0 translate-x-6"
    >
      <MenuItems
        class="flex flex-col justify-center fixed top-0 right-0 h-screen w-screen border-4 p-4"
        :class="[`bg-${state.theme.name}-400 border-${state.theme.name}-300`]"
      >
        <div class="fixed top-4 right-4">
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

        <div v-if="state.auth.user">
          <div class="flex-col items-center space-y-1 p-2">
            <Lang>
              <template #zh>专注者</template>
              <template #en>Logged in as</template>
            </Lang>
            <div class="font-semibold">@{{ state.auth.user.username }}</div>
          </div>

          <hr class="mt-4 mb-4" />

          <MenuItem v-slot="{ active }">
            <button
              class="flex justify-center p-2 font-semibold"
              :class="[
                active && 'underline decoration-6',
                active && `text-${state.theme.name}-200`,
              ]"
              @click="state.auth.logout()"
            >
              <Lang>
                <template #zh>退出</template>
                <template #en>Logout</template>
              </Lang>
            </button>
          </MenuItem>
        </div>

        <div v-else>
          <MenuItem v-slot="{ active }">
            <Link
              href="/register"
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
            </Link>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <Link
              href="/login"
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
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
