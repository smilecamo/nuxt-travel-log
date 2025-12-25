<script setup lang="ts">
const isSidebarOpen = ref(false);
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("sidebarOpen") === "true";
});
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("sidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex hover:cursor-pointer hover:bg-base-300"
        :class="{
          'justify-end': isSidebarOpen,
          'justify-center': !isSidebarOpen,
        }"
        @click="toggleSidebar"
      >
        <Icon v-if="isSidebarOpen" name="tabler:chevrons-left" size="42" />
        <Icon v-else name="tabler:chevrons-right" size="42" />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          icon="tabler:map"
          label="Add Location"
          href="/dashboard"
          :show-label="isSidebarOpen"
        ></SidebarButton>
        <div class="divider"></div>
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:circle-plus-filled"
          label="Add Location"
          href="/dashboard/add-location"
        ></SidebarButton>
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:logout-2"
          label="Sign Out"
          href="/signout"
        ></SidebarButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
