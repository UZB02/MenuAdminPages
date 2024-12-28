<template>
  <section class="xs:p-5 p-1">
    <div class="containe">
        <div
    class="flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0"
  >
    <span class="flex items-center justify-center gap-2">
      <RouterLink to="/menu" class="text-2xl font-bold"> Asosiy </RouterLink>
      <span class="text-2xl">|</span>
      <h1 class="text-2xl font-bold text-green-500">{{product?.name}}</h1>
    </span>
    <span
      class="flex xs:w-auto w-full xs:flex-row flex-col items-center justify-center gap-1"
    >
    </span>
  </div>
      <div
        :class="isloading ? 'block h-[70vh]' : 'hidden'"
        class="w-full flex items-center justify-center p-2 mt-5"
      >
        <div class="loader"></div>
      </div>
      <div
        :class="isloading ? 'hidden' : 'grid'"
        class="grid md:grid-cols-2 xs:mt-7 bg-slate-100/50 shadow-lg rounded-lg mt-4 grid-cols-1 gap-2"
      >
        <img
          class="w-full h-[50vh] object-cover rounded-lg"
          src="https://sun9-69.userapi.com/c858528/v858528199/d59fb/83aoxQjMXUI.jpg"
          alt=""
        />
       <div class="flex flex-col justify-between p-2 gap-2">
        <h1 class="text-center sm:text-3xl text-green-500 text-2xl font-bold">Batafsil</h1>
        <span class="flex items-center gap-2">
            <h1 class="sm:text-2xl text-xl  font-bold">Nomi:</h1>
            <h1 class="font-bold sm:text-xl text-lg text-slate-400">{{ product.name }}</h1>
        </span>
        <span class="flex items-center gap-2">
            <h1 class="sm:text-2xl text-xl  font-bold">Kategoriyasi:</h1>
            <h1 class="font-bold sm:text-xl text-lg text-slate-400">{{product.category}}</h1>
        </span>
        <span class="flex items-center gap-2">
            <h1 class="sm:text-2xl text-xl  font-bold">Qo'shilgan vaqti:</h1>
            <h1 class="font-bold sm:text-xl text-lg text-slate-400">{{formattedCreatedDate}}</h1>
        </span>
        <span class="flex items-center gap-2">
            <h1 class="sm:text-2xl text-xl  font-bold">Taxrirlangan vaqti:</h1>
            <h1 class="font-bold sm:text-xl text-lg text-slate-400">{{formattedupdatedAtDate}}</h1>
        </span>
        <span class="flex sm:flex-row sm:items-center flex-col gap-1">
            <h1 class="sm:text-2xl text-xl  font-bold">Ma'lumot:</h1>
            <h1 class="font-bold sm:text-xl text-lg text-slate-400">{{product?.description}}</h1>
        </span>
        <span class="w-full grid grid-cols-2 gap-2">
              <button
        @click="visible=true"
        class="bg-red-500 p-2 font-bold text-white transition-all duration-200 active:scale-90 rounded-lg"
      >
      <i class="pi pi-trash"></i>
        O'chirish
      </button>
              <button
        @click="router.push(`/menu/edit/${product._id}`)"
        class="bg-green-500 p-2 font-bold text-white transition-all duration-200 active:scale-90 rounded-lg"
      >
      <i class="pi pi-pencil"></i>
        Tahrirlash
      </button>
        </span>
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
      >{{ product?.name }} o'chirilsinmi?</span
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
    </div>
  </section>
</template>
<script setup>
import axios from "axios";
import router from "@/router";
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";

const toast = useToast();
const productID = ref(router.currentRoute.value.params.id);
const isloading = ref(true);
const product = ref({});
const loadingbtn = ref(false);
const visible = ref(false);

const formattedCreatedDate = computed(() => {
  const date = new Date(product.value.createdAt);
  if (isNaN(date)) return "Noto‘g‘ri sana";

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${year}.${month}.${day}`;
});
const formattedupdatedAtDate = computed(() => {
  const date = new Date(product.value.updatedAt);
  if (isNaN(date)) return "Noto‘g‘ri sana";

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${year}.${month}.${day}`;
});

function GetProduct() {
  axios
    .get(`/api/products/${productID.value}`)
    .then((response) => {
      if (response.status == 200) {
        isloading.value = false;
        product.value = response.data;
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetProduct();

function DeleteMenu(id){
    id = productID.value;
  loadingbtn.value = true;
   axios
    .delete(`/api/products/${id}`)
    .then((response) => {
      if (response.status == 200) {
        visible.value = false;
        showSuccess();
        router.push('/menu')
        loadingbtn.value = false;
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

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
