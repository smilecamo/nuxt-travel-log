<script lang="ts" setup>
const useAuth = useAuthStore();
onMounted(() => {
  useAuth.signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <span class="loading loading-spinner loading-xl"></span>
  </div>
</template>

<style scoped>

</style>
