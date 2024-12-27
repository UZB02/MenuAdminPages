<template>
  <div
    class="flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0"
  >
    <span class="flex items-center justify-center gap-2">
      <RouterLink to="/" class="text-2xl font-bold"> Asosiy </RouterLink>
      <span class="text-2xl">|</span>
      <h1 class="text-2xl font-bold text-green-500">Menu</h1>
    </span>
    <span
      class="flex xs:w-auto w-full xs:flex-row flex-col items-center justify-center gap-1"
    >
      <div class="flex xs:w-auto w-full items-center justify-center gap-1">
        <input
          type="text"
          v-model="searchValue"
          placeholder="Qidirish"
          class="border outline-green-500 w-full shadow-md rounded-lg p-2"
        />
        <!-- <button @click="SearchFunction" class="bg-black p-2 text-white transition-all duration-200 active:scale-90 rounded-lg">Qidirish</button> -->
      </div>
      <button
        @click="router.push('/menu/add_menu')"
        class="bg-green-500 xs:w-auto w-full p-2 text-white transition-all duration-200 active:scale-90 rounded-lg"
      >
        Menu Qo'shish
      </button>
    </span>
  </div>
   <div
    :class="isloading ? 'block h-[70vh]' : 'hidden'"
    class="w-full flex items-center justify-center p-2 mt-5"
  >
    <div class="loader"></div>
  </div>
    <div :class="notfound ? 'block' : 'hidden'">
    <NotFoundPage></NotFoundPage>
  </div>
  <div
    class="grid md:grid-cols-3 lg:grid-cols-5 xs:grid-cols-2 grid-cols-1 mt-4 gap-4"
  >
    <div v-motion-pop-visible v-for="(item,itemKey) in search" class="bg-white shadow rounded">
      <span class="absolute right-1 top-1 flex items-center justify-center gap-2">
      <i @click="DeleteModal(item._id)" class="pi pi-trash text-red-500 bg-white p-1 rounded-sm cursor-pointer"></i>
      <RouterLink :to="`/menu/edit/${item._id}`" class="pi pi-pencil bg-white rounded-sm p-1 cursor-pointer"></RouterLink>
      </span>
      <div>
          <img class="w-full h-52 object-cover" src="https://sun9-69.userapi.com/c858528/v858528199/d59fb/83aoxQjMXUI.jpg" alt="Rasm" />
         <div class="p-2 flex flex-col gap-1">
        <h2 class="font-bold text-xl">{{item.name}}</h2>
        <p class="text-sm line-clamp-1">{{item.description}}</p>
        <div class="flex flex-col gap-1">
          <span class="text-2xl font-bold line-clamp-1">{{item.price}} so'm</span>
         <button class="bg-green-500 w-full p-2 text-white transition-all duration-200 active:scale-90 rounded-lg">Batafsil</button>
        </div>
      </div>
      </div>
    </div>
  </div>
  <Toast style="max-width: 300px" />
  <!-- Begin Delete Modal -->
  <Dialog
    v-model:visible="visible"
    header="O'chirish oynasi"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >{{ foundItem?.name }} o'chirilsinmi?</span
    >
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Bekor qilish"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        type="button"
        severity="danger"
        :disabled="loadingbtn"
        :label="loadingbtn ? 'Loading...' : 'O\'chirish'"
        @click="DeleteMenu()"
      ></Button>
    </div>
  </Dialog>
  <!-- End Delete Modal -->
</template>
<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import { ref, computed } from "vue";
import NotFoundPage from "../NotFound/Main.vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import router from "@/router";

const searchValue = ref("");
const toast = useToast();
const isloading = ref(true);
const loadingbtn = ref(false);
const notfound = ref(false);
const visible = ref(false);

const productID = ref("");
const foundItem = ref();

const menu =ref([])
function GetMenu() {
  axios
    .get(`/api/products`)
    .then((response) => {
      if (response.status == 200) {
        isloading.value = false;
        menu.value = response.data.data;
        console.log(response.data.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetMenu();

function DeleteModal(id) {
  productID.value = id;
  visible.value = true;
  foundItem.value = menu.value.find((item) => item._id === id);
}
function DeleteMenu(id){
    id = productID.value;
  loadingbtn.value = true;
   axios
    .delete(`/api/products/${id}`)
    .then((response) => {
      if (response.status == 200) {
        visible.value = false;
        showSuccess();
        GetMenu();
        loadingbtn.value = false;
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

const search = computed(() => {
  if (searchValue.value) {
    let findobekt = menu.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
    if (findobekt.length == 0) {
      notfound.value = true;
    } else {
      notfound.value = false;
      return findobekt;
    }
  } else {
    return menu.value;
  }
});

function showSuccess() {
  toast.add({
    severity: "success",
    summary: "Muvofaqqiyatli bajarildi",
    life: 3000,
  });
}
</script>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: linear-gradient(
      135deg,
      #0000 calc(50% - 0.5em),
      #000 0 calc(50% + 0.5em),
      #0000 0
    )
    right/300% 100%;
  animation: l22 2s infinite;
}
.loader::before {
  content: "Loading...";
  color: #0000;
  padding: 0 5px;
  background: inherit;
  background-image: linear-gradient(
    135deg,
    #000 calc(50% - 0.5em),
    #fff 0 calc(50% + 0.5em),
    #000 0
  );
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes l22 {
  100% {
    background-position: left;
  }
}
</style>
