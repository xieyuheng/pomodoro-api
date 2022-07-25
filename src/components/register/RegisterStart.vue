<script setup lang="ts">
import { RegisterState as State } from "./RegisterState"
</script>

<template>
  <form
    @submit="(event) => handleSubmit(event, state)"
    class="flex w-full flex-col space-y-2 text-xl sm:w-auto"
  >
    <Lang class="font-logo text-3xl font-semibold">
      <template #zh>注册</template>
      <template #en>Register</template>
    </Lang>

    <FormInput name="username" required>
      <template #label>
        <Lang>
          <template #zh>用户名</template>
          <template #en>Username</template>
        </Lang>
      </template>
    </FormInput>

    <FormInput name="name" required>
      <template #label>
        <Lang>
          <template #zh>名字</template>
          <template #en>Name</template>
        </Lang>
      </template>
    </FormInput>

    <FormInput name="email" type="email" required>
      <template #label>
        <Lang>
          <template #zh>电子邮箱</template>
          <template #en>Email</template>
        </Lang>
      </template>

      <template #footer>
        <Lang class="py-1 text-base text-white">
          <template #zh>您的邮箱地址不会被公开</template>
          <template #en>Your email address will be kept private.</template>
        </Lang>
      </template>
    </FormInput>

    <div class="flex flex-col justify-center py-4">
      <hr class="border-t border-white" />
    </div>

    <FormButton>
      <Lang>
        <template #zh>注册</template>
        <template #en>Register</template>
      </Lang>
    </FormButton>

    <div class="flex justify-end">
      <Lang class="text-xl">
        <template #zh>
          已注册？
          <Link href="/login" class="underline"> 登录 </Link>
        </template>
        <template #en>
          Already Registered?
          <Link href="/login" class="underline"> Login </Link>
          .
        </template>
      </Lang>
    </div>
  </form>
</template>
