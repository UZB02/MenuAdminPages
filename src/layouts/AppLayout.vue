<template>
  <header class="w-full shadow sticky top-0 bg-white">
    <Nav></Nav>
  </header>
  <RouterView></RouterView>
</template>
<script setup>
import Nav from '../components/Nav/Main.vue'
import { RouterView } from "vue-router";
import { ref } from "vue";
</script>
<style scoped></style>
