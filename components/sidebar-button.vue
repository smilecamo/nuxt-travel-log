<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();
const route = useRoute();
</script>

<template>
  <NuxtLink
    :class="{
      'bg-base-300': route.path === href,
      'justify-start': showLabel,
      'justify-center': !showLabel,
    }"
    class="flex gap-2 p-2 flex-nowrap hover:bg-base-300 hover:cursor-pointer"
    :to="href"
  >
    <Icon :name="icon" size="24" />
    <Transition name="grow">
      <span v-if="showLabel" class="truncate">{{ label }}</span>
    </Transition>
  </NuxtLink>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}
.grow-leave-active {
  animation: grow 0.2s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
