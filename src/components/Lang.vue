<script setup lang="ts">
import { lang } from "../stores/lang"
</script>

<template>
  <Observer>
    <div>
      <div v-show="lang.zh">
        <slot name="zh"></slot>
      </div>

      <div v-show="lang.en">
        <slot name="en"></slot>
      </div>
    </div>
  </Observer>
</template>
