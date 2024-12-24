<template>
    <section class="p-5">
        <div class="container">
            <CataloguesCard></CataloguesCard>
        </div>
    </section>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CataloguesCard from "../components/Catalogues/CataloguesCard.vue"
</script>
<style scoped>
    
</style>