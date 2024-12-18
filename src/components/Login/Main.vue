<template>
  <section
    class="bg-gray-100 min-h-screen p-5 flex box-border justify-center items-center"
  >
  <Toast style="max-width: 300px;"></Toast>
    <div class="bg-slate-800 rounded-2xl flex max-w-3xl h-[70
    vh] md:p-5 p-2 items-center">
      <div class="md:w-1/2 px-2 md:px-8">
        <h2 class="font-bold text-3xl text-white">Login</h2>
        <p class="text-sm mt-4 text-white">
          Agar siz oldin ro'yxatdan o'tgan bo'lsangiz!
        </p>

        <form action="" class="flex flex-col gap-4">
          <input
            class="p-2 mt-8 rounded-xl outline-none border"
            type="text"
            name="text"
            placeholder="+998901234567"
            v-model="phoneNumber"
          />
          <div class="relative">
            <input
              class="p-2 rounded-xl border outline-none w-full"
              :type="seePassword ? 'text' : 'password'"
              name="password"
              id="password"
              v-model="password"
              :placeholder="seePassword ? 'Password' : '*******'"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              id="togglePassword"
              @click="seePassword =!seePassword"
              :class="seePassword ? 'bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer block' : 'bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden'"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              ></path>
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              @click="seePassword =!seePassword"
              :class="seePassword ? 'bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden' : 'bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer block'"
              id="mama"
              viewBox="0 0 16 16"
            >
              <path
                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
              ></path>
              <path
                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
              ></path>
            </svg>
          </div>
          <button
            @click="login()"
            class="bg-green-500 text-white py-2 rounded-xl hover:bg-green-700 duration-300 font-medium"
            type="button"
          >
            {{ isLoading ? "Loading..." : "Login"}}
          </button>
        </form>
        <div
          class="mt-4 text-sm flex flex-col md:flex-row gap-2 justify-between items-center container-mr"
        >
          <p class="mr-3 md:mr-0 text-white">
            Agar siz ro'yxatdan o'tmagan bo'lsangiz Register tugmasini bosing..
          </p>
          <button
            class=" register text-white underline font-semibold duration-300"
          >
            Register
          </button>
        </div>
      </div>
      <div class="md:block hidden w-1/2">
        <img
          class="rounded-2xl max-h-[1600px]"
          src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="login form image"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const seePassword=ref(false)
const isLoading=ref(false)

const phoneNumber = ref("");
const password=ref("");

const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: `Ma'lumotlarni qayta tekshiring!`, life: 3000 });
};

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Xush Kelibsiz', life: 3000 });
};
function login() {
  isLoading.value=true
 if(password.value=="" && password.value==""){
  isLoading.value=false;
  showError()
 }else{
   axios
    .post(
      `https://menu-cafe.onrender.com/api/admin/login`,
      {
        phoneNumber: phoneNumber.value,
        password: password.value,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZjBhMjA0ZDY2YWViM2Q1ZTk0ODFjIiwiaWF0IjoxNzM0Mzc0MzMyLCJleHAiOjE3MzY5NjYzMzJ9.NfHGphyboMaDe1xelel8ZLpr9arn5Ffe2_HSaD7xqP0`,
        },
      }
    )
    .then((response) => {
      if(response.status == 200) {
        showSuccess()
        localStorage.setItem("token", response.data.token);
        router.push("/");
        isLoading.value=false
      }
    })
    .catch((error) => {
      isLoading.value=false;
      console.error("Xatolik yuz berdi:", error);
    });
 }
}
</script>
<style scoped></style>
