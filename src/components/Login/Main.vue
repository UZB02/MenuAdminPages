<template>
  <section
    class="bg-gray-100 min-h-screen p-5 flex box-border justify-center items-center"
  >
  <Toast style="max-width: 300px;"></Toast>
    <div class="bg-slate-800 rounded-2xl flex max-w-3xl h-[70
    vh] md:p-5 p-2 items-center">
      <div class="md:w-1/2 px-2 md:px-8">
        <h2 class="font-bold text-3xl text-white">Login</h2>
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
<style scoped>
section{
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1005%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/rect%3e%3cpath d='M300.556%2c464.835C322.166%2c465.917%2c340.609%2c450.983%2c351.708%2c432.409C363.143%2c413.272%2c368.173%2c389.578%2c357.079%2c370.242C345.943%2c350.832%2c322.931%2c342.861%2c300.556%2c343.254C278.931%2c343.634%2c257.181%2c352.894%2c247.369%2c372.168C238.219%2c390.142%2c247.53%2c410.202%2c257.57%2c427.694C267.673%2c445.297%2c280.285%2c463.82%2c300.556%2c464.835' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1194.516%2c604.206C1226.522%2c604.551%2c1257.114%2c590.666%2c1274.463%2c563.767C1293.431%2c534.358%2c1301.081%2c496.492%2c1283.504%2c466.232C1265.989%2c436.079%2c1229.372%2c425.094%2c1194.516%2c426.133C1161.636%2c427.114%2c1130.484%2c442.658%2c1114.269%2c471.279C1098.269%2c499.521%2c1100.725%2c534.287%2c1117.5%2c562.075C1133.709%2c588.925%2c1163.155%2c603.868%2c1194.516%2c604.206' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M253.662%2c291.779C300.966%2c289.881%2c345.281%2c267.095%2c368.65%2c225.923C391.734%2c185.254%2c386.178%2c136.923%2c365.313%2c95.072C341.443%2c47.194%2c306.995%2c-0.511%2c253.662%2c-4.718C194.162%2c-9.412%2c135.409%2c22.358%2c106.669%2c74.668C78.825%2c125.347%2c89.079%2c187.958%2c121.497%2c235.84C150.242%2c278.297%2c202.43%2c293.835%2c253.662%2c291.779' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M813.913%2c286.677C842.765%2c286.298%2c873.766%2c280.748%2c888.631%2c256.018C903.841%2c230.714%2c896.323%2c199.389%2c881.847%2c173.657C867.024%2c147.307%2c844.13%2c124.181%2c813.913%2c123.199C782.22%2c122.169%2c753.78%2c141.547%2c737.871%2c168.977C721.904%2c196.506%2c718.443%2c231.297%2c735.713%2c258.028C751.859%2c283.02%2c784.162%2c287.068%2c813.913%2c286.677' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M379.6088475656637 382.9296641366887L436.0834283665852 480.7465074200384 477.42569084901345 326.4550833357672z' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M59.33736775324937 541.5520408850746L208.30768659711993 490.41619878970727 105.99006812826215 398.2890013174244z' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1093.0172282788849 59.24214855734437L964.4118750069457-15.008186773436613 890.1615396761647 113.59716649850259 1018.7668929481039 187.84750182928357z' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M927.3129818677705 279.74126158818837L843.9724605450704 313.41301787733335 877.6442168342153 396.7535392000335 960.9847381569155 363.08178291088853z' fill='rgba(30%2c 41%2c 59%2c 1)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1005'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
