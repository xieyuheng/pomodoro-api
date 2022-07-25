<script setup lang="ts">
import { RegisterState as State } from "./RegisterState"
import { Verifying } from "./models/Verifying"

defineProps<{ state: State; verifying: Verifying }>()
</script>

<template>
  <div class="text-xm overflow-x-auto py-1">
    <div class="flex flex-col items-center text-center">
      <Lang class="py-2 text-xl font-bold">
        <template #zh> 等待邮件注册确认 </template>
        <template #en> Awaiting Register Email Confirmation </template>
      </Lang>

      <Lang class="py-1 text-lg">
        <template #zh> 已向 <b>{verifying.email}</b> 发送了邮件 </template>
        <template #en>
          We just sent an email to <b>{verifying.email}</b>
        </template>
      </Lang>

      <Lang class="py-1 text-lg">
        <template #zh> 确认前，请比对 <b>识别码</b>： </template>
        <template #en>
          Before verifying, please compare the <b>confirmation code</b>:
        </template>
      </Lang>

      <div class="py-2 text-lg">
        <p
          class="border-4 py-1 px-2 font-black"
          :class="[`border-${state.theme.name}-300 bg-${state.theme.name}-500`]"
        >
          {{ verifying.confirmation_code }}
        </p>
      </div>

      <button
        class="my-2 font-sans font-bold"
        :class="[
          `text-${state.theme.name}-50 hover:text-${state.theme.name}-200`,
        ]"
      >
        <Lang class="py-1 text-lg">
          <template #zh> 撤销 </template>
          <template #en> REVOKE </template>
        </Lang>
      </button>
    </div>
  </div>
</template>
