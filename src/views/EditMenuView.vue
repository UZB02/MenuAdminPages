<template>
  <section class="xs:p-5 p-1">
    <div class="containe">
      <div
        class="flex xs:flex-row flex-col justify-between items-center gap-2 mx-auto my-0"
      >
        <span class="flex items-center justify-center gap-2">
          <RouterLink to="/menu" class="text-2xl font-bold"> Menu </RouterLink>
          <span class="text-2xl">|</span>
          <h1 class="text-2xl font-bold text-green-500">Tahrirlash</h1>
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
        class="grid md:grid-cols-2 xs:mt-7 mt-4 grid-cols-1 gap-2"
      >
        <img
          class="w-full object-cover rounded-lg"
          src="https://sun9-69.userapi.com/c858528/v858528199/d59fb/83aoxQjMXUI.jpg"
          alt=""
        />
        <form class="p-2 flex flex-col gap-2 bg-slate-100 rounded-lg">
          <div class="grid xs:grid-cols-2 grid-cols-1 gap-2">
            <div>
              <label for="">Rasmi</label>
              <input
                type="file"
                placeholder="Taom nomi"
                class="border w-full p-2 rounded-lg outline-green-500"
              />
            </div>
            <div>
              <label for="">Nomi</label>
              <input
                type="text"
                v-model="editname"
                placeholder="Taom nomi"
                class="border w-full p-2 rounded-lg outline-green-500"
              />
            </div>
          </div>
          <div class="grid xs:grid-cols-2 grid-cols-1 gap-2">
              <div>
            <label for="">Narxi</label>
            <input
              type="number"
              v-model="editprice"
              placeholder="25000"
              class="border w-full p-2 rounded-lg outline-green-500"
            />
          </div>
             <div>
              <label for="">Katalogini tanlang</label>
              <select
                v-model="editcatalog"
                id=""
                class="border w-full p-2 rounded-lg outline-green-500"
              >
                <option v-for="item in allcatalogues" :value="item.name">
                  {{ item.name ? item.name : "Qayta urunib ko'ring" }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label for="">Ma'lumot</label>
            <textarea
              cols="10"
              v-model="editdescription"
              placeholder="Taom haqida ma'lumot kiriting"
              class="border w-full xs:h-[32vh] p-2 rounded-lg outline-green-500"
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <Button
              type="button"
              label="Bekor qilish"
              severity="danger"
              style="width: 100%"
              @click="router.push('/menu')"
            ></Button>
            <Button
              type="button"
              severity="success"
              style="width: 100%"
              :disabled="loadingbtn"
              :label="loadingbtn ? 'Loading...' : 'Tahrirlash'"
              @click="EditProduct()"
            ></Button>
          </div>
        </form>
      </div>
      <Toast style="max-width: 300px" />
    </div>
  </section>
</template>
<script setup>
import axios from "axios";
import router from "@/router";
import { ref } from "vue";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const productID = ref(router.currentRoute.value.params.id);
const isloading = ref(true);
const product = ref();
const editname = ref("");
const editdescription = ref("");
const editprice = ref("");
const editimg = ref("");
const loadingbtn = ref(false);
const allcatalogues = ref([]);
const editcatalog = ref("");

function GetProduct() {
  axios
    .get(`/api/products/${productID.value}`)
    .then((response) => {
      if (response.status == 200) {
        isloading.value = false;
        editname.value = response.data.name;
        editprice.value = response.data.price;
        editdescription.value = response.data.description;
        editcatalog.value = response.data.category
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetProduct();

function EditProduct() {
  loadingbtn.value = true;
  axios
    .put(`/api/products/${productID.value}`, {
      name: editname.value,
      price: editprice.value,
      description: editdescription.value,
      image: editimg.value,
      category: editcatalog.value,
    })
    .then((response) => {
      if (response.status == 200) {
        loadingbtn.value = false;
        showSuccess();
        router.push("/menu");
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function GetCatalogues() {
  axios
    .get(`/api/category/`)
    .then((response) => {
      if (response.status == 200) {
        allcatalogues.value = response.data.data;
        console.log(response.data.data);
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
GetCatalogues();

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
