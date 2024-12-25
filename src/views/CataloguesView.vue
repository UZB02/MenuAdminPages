<template>
    <section class="xs:p-5 p-1">
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