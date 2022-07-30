<script setup lang="ts">
import "../assets/styles/index.css"
import "../utils/registerServiceWorker"
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
