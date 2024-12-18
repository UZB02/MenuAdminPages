<script setup>
import Nav from "./components/Nav/Main.vue";
import { RouterLink, RouterView } from "vue-router";
import AppLayout from "./layouts/AppLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const layout = computed(() => route.meta.layout || AppLayout);
import { ref } from "vue";
import router from "./router";

function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Welcome to");
  } else {
    router.push("/login");
  }
}
checkToken();
</script>

<template>
  <header class="w-full shadow sticky top-0 bg-white">
    <Nav></Nav>
  </header>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
