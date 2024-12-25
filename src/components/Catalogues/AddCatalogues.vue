<template>
  <Dialog
    v-model:visible="visible"
    header="Katalog qo'shish"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">
        <input type="text" placeholder="Katalog nomi" class="border w-full p-2 rounded-lg outline-green-500">
    </span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Bekor qilish"
        severity="secondary"
        @click="visible=false"
      ></Button>
      <Button type="button" severity="success" label="Qo'shish"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { defineProps, defineEmits, ref } from 'vue';

// Props orqali parentdan 'visible' ni olish
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

// Emit orqali parentga 'visible' ni yuborish
const emit = defineEmits(['update:visible']);

// Dialogni ko'rsatish / yopish uchun lokal holat
const visible = ref(true);
console.log(visible.value);

// Dialogni yopish
const cancel = () => {
  emit('update:visible', false); // Parentga 'false' yuborish
};
</script>

<style scoped>
</style>
