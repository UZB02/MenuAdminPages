<template >
    <nav class="p-2">
        <div class="container flex justify-between my-0 mx-auto">
            <div class="left">
                <img class="w-11" src="https://yt3.googleusercontent.com/ytc/AOPolaTt_GOD4rxntso-OOkG93lyMNbKuCEE1-_A_Rvb=s900-c-k-c0x00ffffff-no-rj" alt="">
            </div>
            <div class="right">
                   <Button type="button" label="Logout" icon="pi pi-sign-out" :loading="loading" @click="logout" />
            </div>
        </div>
    </nav>
</template>
<script setup>
import router from '@/router';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'
function logout(){
  localStorage.removeItem("token")
  router.push("/login")
}
</script>
<style>
    
</style>