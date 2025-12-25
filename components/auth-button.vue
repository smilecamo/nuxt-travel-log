<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="flex items-center">
    <ClientOnly>
      <div v-if="authStore.user" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn m-1">
          <div v-if="authStore.user?.image" class="avatar">
            <div class="w-6 rounded-full">
              <img :src="authStore.user?.image" :alt="authStore.user?.name || 'User avatar'" />
            </div>
          </div>
          {{ authStore.user.name }}
        </div>
        <ul tabindex="-1" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
            <NuxtLink to="/signout"> <Icon name="tabler:logout-2" size="24" />Sign Out</NuxtLink>
          </li>
        </ul>
      </div>
      <button v-else class="btn btn-accent" @click="authStore.signIn">
        Sign In With Github
        <span v-if="authStore.loading" class="loading loading-spinner loading-md"></span>
        <Icon v-else name="tabler:brand-github" />
      </button>

      <template #fallback>
        <button class="btn btn-accent">
          Sign In With Github
          <Icon name="tabler:brand-github" />
        </button>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
