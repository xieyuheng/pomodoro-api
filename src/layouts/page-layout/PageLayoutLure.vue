<script setup lang="ts">
import { PageLayoutState as State } from "./PageLayoutState"
import { Listbox, Transition } from "@headlessui/vue"
import {
  TranslateIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/vue/outline/index.js"

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex space-x-1 text-xl font-semibold">
    <NuxtLink to="/register" class="hover:underline">
      <Lang>
        <template #zh>注册</template>
        <template #en>Register</template>
      </Lang>
    </NuxtLink>
    <div>/</div>

    <NuxtLink to="/login" class="hover:underline">
      <Lang>
        <template #zh>登录</template>
        <template #en>Login</template>
      </Lang>
    </NuxtLink>
  </div>
</template>
