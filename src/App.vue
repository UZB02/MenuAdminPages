<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue';
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const layout = computed(() => route.meta.layout || AppLayout);
import { ref } from 'vue';
import router from './router';

function checkToken(){
  const token = ref(localStorage.getItem('token'));
  if (!token.value) {
    console.log("Welcome to");
    console.log(token.value,888);
  }else{
    router.push("/login")
  }
}
checkToken();
</script>

<template>
     <component :is="layout">
      <RouterView />
    </component>
</template>

<style scoped>
</style>
