<template>
  <RouterView></RouterView>
</template>
<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";

function checkToken(){
  const token = ref(localStorage.getItem('token'));
  if (token.value==null) {
    console.log("Welcome to");
  }else{
    router.push("/login")
  }
}

checkToken();
</script>
<style scoped></style>
