<template>
    <div>
        <h1>Salom</h1>
    </div>
</template>
<script setup>
import axios from "axios"
import { ref } from "vue";
const token =ref(localStorage.getItem("token"))
console.log(token.value);
function GetAdmins() {
    console.log(555);
   axios
    .get(
      `https://menu-cafe.onrender.com/api/admin/`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
        },
      }
    )
    .then((response) => {
      if(response.status == 200) {
     console.log(response);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
 }
 GetAdmins();

</script>
<style scoped>
    
</style>