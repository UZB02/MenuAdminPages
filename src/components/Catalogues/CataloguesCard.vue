<template>
  <div
    class="flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0"
  >
    <span class="flex items-center justify-center gap-2">
      <RouterLink to="/" class="text-2xl font-bold"> Asosiy </RouterLink>
      <span class="text-2xl">|</span>
      <h1 class="text-2xl font-bold text-green-500">Katologlar</h1>
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
      @click="addModal()"
        class="bg-green-500 xs:w-auto w-full p-2 text-white transition-all duration-200 active:scale-90 rounded-lg"
      >
        Katalog Qo'shish
      </button>
    </span>
  </div>
  <div
    :class="isloading ? 'block' : 'hidden'"
    class="w-full flex items-center justify-center p-2 mt-5"
  >
    <div class="loader"></div>
  </div>
  <div :class="notfound ? 'block' : 'hidden'">
    <NotFoundPage></NotFoundPage>
  </div>
  <div
    class="w-full grid grid-cols-1 gap-3 p-2"
    :class="isloading ? 'block' : ''"
  >
    <span
      v-motion-slide-visible-bottom
      v-for="(item, itemkey) in search"
      ::key="itemkey"
      class="p-4 flex items-center justify-between text-center relative bg-slate-100 rounded-lg transition-all duration-150 ease-linear hover:scale-[1.02]"
    >
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-slate-500">{{ itemkey + 1 }}.</h2>
        <h1 class="font-serif">{{ item.name }}</h1>
      </div>
      <div class="flex items-center justify-center right-2 gap-2">
        <i
          @click="DeleteModal(item._id)"
          class="pi pi-trash text-red-500 cursor-pointer"
        ></i>
        <i @click="editModal(item._id)" class="pi pi-pencil cursor-pointer text-amber-800"></i>
      </div>
    </span>
  </div>
  <!-- Begin Delete Modal -->
  <Dialog
    v-model:visible="visible"
    :header="foundItem?.name"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Katalog o'chirilsinmi?</span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Bekor qilish"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button type="button" severity="danger" label="Delete" @click="DeleteCatalogues()"></Button>
    </div>
  </Dialog>
  <!-- End Delete Modal -->
     <Toast style="max-width: 300px;"/>
      <!-- Begin Add Modal -->
      <Dialog
    v-model:visible="addmodal"
    header="Katalog qo'shish"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
        <input type="text" v-model="addinput" placeholder="Katalog nomi" class="border w-full p-2 rounded-lg outline-green-500">
    </span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Bekor qilish"
        severity="secondary"
        @click="addmodal=false"
      ></Button>
      <Button type="button" severity="success" :label="loadingbtn ? 'Loading...' : 'Qo\'shish'" @click="addCatalogue()"></Button>
    </div>
  </Dialog>
  <!-- End Add Modal -->
      <!-- Begin Edit Modal -->
      <Dialog
    v-model:visible="editmodal"
    header="Tahrirlash"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
        <input type="text" v-model="editinput" placeholder="Katalog nomi" class="border w-full p-2 rounded-lg outline-green-500">
    </span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Bekor qilish"
        severity="secondary"
        @click="editmodal=false"
      ></Button>
      <Button type="button" severity="success" :label="loadingbtn ? 'Loading...' : 'Tahrirlash'" @click="editCatalogue()"></Button>
    </div>
  </Dialog>
  <!-- End Edit Modal -->
</template>
<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import NotFoundPage from "../NotFound/Main.vue";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
let catalogues = ref([]);

const toast = useToast();
const isloading = ref(true);
const loadingbtn=ref(false);
const searchValue = ref("");
const notfound = ref(false);
const visible = ref(false);
const addmodal= ref(false);
const addinput= ref('');
const editmodal=ref(false);
const editinput= ref('');
let productID = ref();
const foundItem= ref()

function addModal(){
    addmodal.value=true;
    console.log(addmodal.value);
}

function addCatalogue(){
  loadingbtn.value=true;
    axios
    .post(`https://menu-cafe.onrender.com/api/category/create`,
    {
      name:addinput.value,
    }, 
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        loadingbtn.value=false;
        addmodal.value=false;
        showSuccess()
        GetCatalogues();
        console.log(response);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function editModal(id){
  productID.value=id
  editmodal.value=true;
  let findobekt=catalogues.value.find((item)=>item._id==id)
  editinput.value=findobekt?.name
}
function editCatalogue(){
  loadingbtn.value=true;
    axios
    .put(`https://menu-cafe.onrender.com/api/category/${productID.value}`,
    {
      name:editinput.value,
    }, 
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        loadingbtn.value=false;
        editmodal.value=false;
        showSuccess()
        GetCatalogues();
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

const search = computed(() => {
  if (searchValue.value) {
    let findobekt = catalogues.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
    if (findobekt.length == 0) {
      notfound.value = true;
    } else {
      notfound.value = false;
      return findobekt;
    }
  } else {
    return catalogues.value;
  }
});
function GetCatalogues() {
  axios
    .get(`https://menu-cafe.onrender.com/api/category/`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        catalogues.value = response.data.data;
        isloading.value = false;
        console.log(response.data.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetCatalogues();

function DeleteModal(id) {
  productID.value = id;
  visible.value = true;
  foundItem.value = catalogues.value.find((item) => item._id === id)
}
function DeleteCatalogues(id) {
  id = productID.value;
  axios
    .delete(`https://menu-cafe.onrender.com/api/category/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        visible.value = false;
        showSuccess()
        GetCatalogues();
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function showSuccess(){
    toast.add({ severity: 'success', summary: 'Muvofaqqiyatli bajarildi', life: 3000 });
};
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
