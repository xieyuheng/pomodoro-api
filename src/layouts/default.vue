<script setup lang="ts">
import "../assets/styles/index.css"
import "../scripts/config-mobx"
import "../scripts/register-service-worker"

import PageLayout from "./page-layout/PageLayout.vue"
</script>

<template>
  <div class="min-h-screen">
    <Head>
      <Meta name="description" content="🍅 A Pomodoro timer." />
      <Link rel="shortcut icon" href="/favicon.ico" />
    </Head>

    <PageLayout>
      <slot />
    </PageLayout>
  </div>
</template>
