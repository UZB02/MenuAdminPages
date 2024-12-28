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
      <div class="grid md:grid-cols-2 xs:mt-7 mt-4 grid-cols-1 gap-2">
        <div
          :class="
            img
              ? 'hidden'
              : 'bg-slate-100 border-dotted flex items-center justify-center'
          "
          style="border: 3px dotted slategray"
        >
          <h1 class="text-2xl font-bold text-slate-600">Taom rasmi</h1>
        </div>
        <img
          :class="img ? 'w-full object-cover rounded-lg' : 'hidden'"
          :src="img"
          alt=""
        />
        <form class="p-2 flex flex-col gap-2 bg-slate-100 rounded-lg">
          <div class="grid xs:grid-cols-2 grid-cols-1 gap-2">
            <div>
              <label for="">Rasmi</label>
              <input
                @change="handleFileChange"
                type="file"
                class="border w-full p-2 rounded-lg outline-green-500"
              />
            </div>
            <div>
              <label for="">Nomi</label>
              <input
                type="text"
                v-model="name"
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
                v-model="price"
                placeholder="25000"
                class="border w-full p-2 rounded-lg outline-green-500"
              />
            </div>
            <div>
              <label for="">Katalogini tanlang</label>
              <select
                v-model="catalogue"
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
              v-model="description"
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
              :label="loadingbtn ? 'Loading...' : 'Qo\'shish'"
              @click="AddProduct()"
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
const allcatalogues = ref([]);
const catalogue = ref("");
const name = ref("");
const description = ref("");
const price = ref("");
const img = ref("");
const loadingbtn = ref(false);

const handleFileChange = (event) => {
  if (event && event.target && event.target.files) {
    const file = event.target.files[0]; // Faylni olamiz
    if (file) {
      const imgURL = URL.createObjectURL(file); // Fayl uchun URL yaratiladi
      img.value = imgURL;

      const formData = new FormData(); // FormData obyektini yarating
      formData.append("image", img.value); // Faylni qo'shing

      axios
        .post(`api/upload/`, formData)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
          }
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi:", error);
        });
    }
  } else {
    console.error("Event yoki target noto'g'ri ishlamoqda");
  }
};

function AddProduct() {
  if (name.value == "" || price.value == "" || description.value == "") {
    toast.add({
      severity: "error",
      summary: "To'ldirilgan bo'lim bo'sh",
      life: 3000,
    });
    return;
  } else {
    loadingbtn.value = true;
    axios
      .post(`/api/products/create`, {
        name: name.value,
        price: price.value,
        description: description.value,
        image: img.value,
        category: catalogue.value,
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
<style scoped></style>
