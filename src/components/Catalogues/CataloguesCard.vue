<template>
    
    <div class=" flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0">
        <span class="flex items-center justify-center gap-2">
            <RouterLink to="/" class="text-2xl font-bold">
                Asosiy
            </RouterLink>
            <span class="text-2xl">|</span>
            <h1 class="text-2xl font-bold text-blue-500">Katologlar</h1>
        </span>
        <span class="flex xs:flex-row flex-col items-center justify-center gap-1">
            <div class="flex items-center justify-center gap-1">
                 <input type="text" placeholder="Qidirish" class="border w-full rounded-lg p-2">
            <button class="bg-black p-2 text-white transition-all duration-200 active:scale-90 rounded-lg">Qidirish</button>
            </div>
            <button class="bg-blue-500 xs:w-auto w-full p-2 text-white transition-all duration-200 active:scale-90 rounded-lg">Qo'shish</button>
        </span>
    </div>
    <div :class="isloading ? 'block' : 'hidden'" class="w-full flex items-center justify-center p-2 mt-5">
        <div class="loader"></div>
    </div>
    <div class="w-full grid grid-cols-1 gap-3 p-2" :class="isloading ? 'block' : ''">
        <span v-motion-slide-visible-right v-for="(item,itemkey) in catalogues" ::key="itemkey" class="p-4 flex items-center justify-between text-center relative bg-slate-100 rounded-lg transition-all duration-150 ease-linear hover:scale-[1.02]">
            <div class="flex items-center  gap-2">
                <h2 class="font-bold text-slate-500">{{itemkey + 1}}.</h2>
                <h1 class="font-serif">{{item.name}}</h1>
            </div>
            <div class="flex items-center justify-center  right-2 gap-2">
                <i @click="DeleteCatalogues(item._id)" class="pi pi-trash cursor-pointer"></i>
                <i class="pi pi-pencil cursor-pointer"></i>
            </div>
                
        </span>
    </div>
</template>
<script setup>
import axios from 'axios';
import { RouterLink } from "vue-router";
import { ref } from 'vue';

import 'primeicons/primeicons.css'
const isloading=ref(true)

let catalogues = ref([]);
function GetCatalogues() {
    axios
    .get(
        `https://menu-cafe.onrender.com/api/category/`,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
            },
        }
        )
        .then((response) => {
            if(response.status == 200) {
        catalogues.value = response.data.data;
        isloading.value=false
        console.log(response.data.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetCatalogues()

// function EditeCatalogues(id) {
//     console.log(id);
//     axios
//     .get(
//         `https://menu-cafe.onrender.com/api/category/${id}`,
//         {
//             headers: {
//                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
//             },
//         }
//         )
//         .then((response) => {
//             if(response.status == 200) {
//                 GetCatalogues();
//         console.log(response);
//       }
//     })
//     .catch((error) => {
//       console.error("Xatolik yuz berdi:", error);
//     });
// }
function DeleteCatalogues(id) {
    console.log(id);
    axios
    .get(
        `https://menu-cafe.onrender.com/api/category/${id}`,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
            },
        }
        )
        .then((response) => {
            if(response.status == 200) {
                GetCatalogues();
        console.log(response);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
console.log(catalogues.value,55);
</script>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: linear-gradient(135deg,#0000 calc(50% - 0.5em),#000 0 calc(50% + 0.5em),#0000 0) right/300% 100%;
  animation: l22 2s infinite;
}
.loader::before {
  content: "Loading...";
  color: #0000;
  padding: 0 5px;
  background: inherit;
  background-image: linear-gradient(135deg,#000 calc(50% - 0.5em),#fff 0 calc(50% + 0.5em),#000 0);
  -webkit-background-clip:text;
          background-clip:text;
}

@keyframes l22{
  100%{background-position: left}
}
</style>