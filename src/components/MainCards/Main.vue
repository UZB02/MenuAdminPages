<template>
  <div
    class="w-full grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-center px-3"
  >
    <div v-motion-pop-visible
      v-for="item in pages"
      class="card shadow border bg-white rounded-lg flex items-center justify-center flex-col gap-2 transition duration-150"
    >
      <div class="top w-full flex items-center justify-center">
        <img class="h-52 rounded-full object-cover" :src="item.img" />
      </div>
      <div
        class="w-full text-center p-4 flex flex-col items-center justify-center gap-2"
      >
        <h1 class="font-bold text-xl">{{item.title}}</h1>
        <RouterLink :to="item.path" class="w-full">
          <div
            class="w-full text-center bg-green-500 py-2 text-white rounded-2xl"
          >
            Kirish
          </div>
        </RouterLink>
      </div>
      <!-- <div>
                <i class="pi pi-server"></i>
            </div> -->
    </div>
  </div>
</template>
<script setup>
import "primeicons/primeicons.css";
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const pages = [
  {
    id: 1,
    path: "/catalogues",
    title: "Kataloglar",
    img: "https://avatars.mds.yandex.net/i?id=f595e5aac2659aaf06bcfc1f98052b71_l-5026122-images-thumbs&ref=rim&n=13&w=900&h=900",
  },
  {
    id: 2,
    path: "/menu",
    title: "Menu",
    img: "https://doohda.com/upload/screen_image/16_screen_image.png",
  },
  {
    id: 3,
    path: "/admins",
    title: "Adminlar",
    img: "https://cdn4.iconfinder.com/data/icons/project-management-6-2/65/256-1024.png",
  },
];
</script>
<style scoped>
.card {
  transition: all 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
}
</style>
