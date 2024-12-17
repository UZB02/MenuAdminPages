<script setup>
import router from '@/router';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'
function logout(){
  localStorage.removeItem("token")
  router.push("/login")
}
</script>

<template>
   <Button type="button" label="Logout" icon="pi pi-sign-out" :loading="loading" @click="logout" />
</template>
