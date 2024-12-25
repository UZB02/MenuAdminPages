<template>
  <div
    class="flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0"
  >
    <span class="flex items-center justify-center gap-2">
      <RouterLink to="/" class="text-2xl font-bold"> Asosiy </RouterLink>
      <span class="text-2xl">|</span>
      <h1 class="text-2xl font-bold text-green-500">Adminlar</h1>
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
        Admin qo'shish
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
  <span :class="isloading ? 'hidden' : 'grid'" class="p-4 grid grid-cols-4 gap-2 bg-slate-100 rounded-lg">
    <span class="font-bold  flex justify-between"><h1>ID</h1><h1>F.I</h1></span>
    <span class="font-bold "></span>
    <span class="font-bold xs:text-start text-center"><h1>Tell</h1></span>
    <span class="font-bold text-end"><h1>Amal</h1></span>
  </span>
    <span
      v-motion-slide-visible-bottom
      v-for="(item, itemkey) in search"
      ::key="itemkey"
      class="p-4 flex items-center gap-2 justify-between text-center relative bg-slate-100 rounded-lg transition-all duration-150 ease-linear hover:bg-slate-300"
    >
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-slate-500">{{ itemkey + 1 }}.</h2>
        <h1 class="font-serif">{{ item.fullname }}</h1>
      </div>
      <div class="flex items-center">
        <h2 class="text-center">
          {{ item.phoneNumber }}
        </h2>
      </div>
      <div class="flex items-center justify-center right-2 gap-2">
        <i
          @click="DeleteModal(item._id)"
          class="pi pi-trash text-red-500 cursor-pointer"
        ></i>
        <i
          @click="editModal(item._id)"
          class="pi pi-pencil cursor-pointer text-amber-800"
        ></i>
      </div>
    </span>
  </div>
  <!-- Begin Delete Modal -->
  <Dialog
    v-model:visible="visible"
    :header="foundItem?.fullname"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Admin o'chirilsinmi?</span
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
        @click="DeleteAdmin()"
      ></Button>
    </div>
  </Dialog>
  <!-- End Delete Modal -->
  <Toast style="max-width: 300px" />
  <!-- Begin Add Modal -->
  <Dialog
    v-model:visible="addmodal"
    header="Admin qo'shish"
    :style="{ width: '25rem' }"
  >
    <form>
      <span class="text-surface-500 flex flex-col gap-2 dark:text-surface-400 mb-8">
        <div>
          <label for="">Ism Familiya</label>
        <input
          type="text"
          v-model="fullname"
          placeholder="Vali Aliyev"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
        </div>
       <div>
         <label for="">Telefon raqami</label>
        <input
          type="text"
          v-model="phoneNumber"
          placeholder="+998901234567"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
       </div>
       <div>
         <label for="">Parol</label>
        <input
          type="password"
          v-model="password"
          placeholder="*******"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
       </div>
      </span>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Bekor qilish"
          severity="secondary"
          @click="addmodal = false"
        ></Button>
        <Button
          type="button"
          severity="success"
          :disabled="loadingbtn"
          :label="loadingbtn ? 'Loading...' : 'Qo\'shish'"
          @click="addCatalogue()"
        ></Button>
      </div>
    </form>
  </Dialog>
  <!-- End Add Modal -->
  <!-- Begin Edit Modal -->
  <Dialog
    v-model:visible="editmodal"
    header="Tahrirlash"
    :style="{ width: '25rem' }"
  >
    <form>
      <span class="text-surface-500 flex flex-col gap-2 dark:text-surface-400 mb-8">
        <div>
          <label for="">Ism Familiya</label>
        <input
          type="text"
          v-model="editfullname"
          placeholder="Vali Aliyev"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
        </div>
       <div>
         <label for="">Telefon raqami</label>
        <input
          type="text"
          v-model="editphoneNumber"
          placeholder="+998901234567"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
       </div>
       <!-- <div>
         <label for="">Parol</label>
        <input
          type="password"
          v-model="editpassword"
          placeholder="*******"
          class="border w-full p-2 rounded-lg outline-green-500"
        />
       </div> -->
      </span>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Bekor qilish"
          severity="secondary"
          @click="editmodal = false"
        ></Button>
        <Button
          type="button"
          severity="success"
          :disabled="loadingbtn"
          :label="loadingbtn ? 'Loading...' : 'Tahrirlash'"
          @click="editAdmin()"
        ></Button>
      </div>
    </form>
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
const loadingbtn = ref(false);
const searchValue = ref("");
const notfound = ref(false);
const visible = ref(false);
const addmodal = ref(false);
const fullname = ref("");
const password = ref("");
const phoneNumber = ref("");
const editmodal = ref(false);
const editfullname = ref("");
const editphoneNumber = ref("");
// const editpassword = ref("");
let productID = ref();
const foundItem = ref();

function addModal() {
  addmodal.value = true;
  console.log(addmodal.value);
}

function addCatalogue() {
  loadingbtn.value = true;
  axios
    .post(
      `/api/admin/create`,
      {
        fullname: fullname.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      }
    )
    .then((response) => {
      if (response.status == 200) {
        loadingbtn.value = false;
        addmodal.value = false;
        showSuccess();
        GetAdmins()
        console.log(response);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function editModal(id) {
  productID.value = id;
  editmodal.value = true;
  let findobekt = catalogues.value.find((item) => item._id == id);
  editfullname.value = findobekt?.fullname;
  editphoneNumber.value = findobekt?.phoneNumber;
  // editpassword.value = findobekt?.password;
}
function editAdmin() {
  loadingbtn.value = true;
  axios
    .put(`/api/admin/${productID.value}`, {
      fullname: editfullname.value,
      phoneNumber: editphoneNumber.value,
    })
    .then((response) => {
      if (response.status == 200) {
        loadingbtn.value = false;
        editmodal.value = false;!important
        showSuccess();
        GetAdmins();
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
} 
// editAdmin funksiyasida muammo bor 

const search = computed(() => {
  if (searchValue.value) {
    let findobekt = catalogues.value.filter((item) =>
      item.fullname.toLowerCase().includes(searchValue.value.toLowerCase())
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
function GetAdmins() {
  axios
    .get(`/api/admin/`)
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
GetAdmins();

function DeleteModal(id) {
  productID.value = id;
  visible.value = true;
  foundItem.value = catalogues.value.find((item) => item._id === id);
}
function DeleteAdmin(id) {
  id = productID.value;
  loadingbtn.value = true;
  axios
    .delete(`/api/admin/${id}`)
    .then((response) => {
      if (response.status == 200) {
        visible.value = false;
        showSuccess();
        GetAdmins();
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
