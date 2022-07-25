<script setup lang="ts">
const lang = useLang()
const theme = useTheme()
</script>

<template>
  <div class="flex flex-col">
    <button
      class="rounded-sm border-2 py-3 font-sans font-bold text-white"
      :class="[`border-${theme.name}-200 hover:bg-${theme.name}-500`]"
      type="submit"
    >
      <slot />
    </button>
  </div>
</template>
