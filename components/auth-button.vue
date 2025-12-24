<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <button class="btn btn-accent" @click="authStore.signIn">
    Sign In github
    <span v-if="authStore.loading" class="loading loading-spinner loading-md"></span>
    <Icon v-else name="tabler:brand-github" />
  </button>
</template>

<style scoped>

</style>
