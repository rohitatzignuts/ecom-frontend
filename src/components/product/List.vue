<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Card from './Card.vue';

// stores
const productStore = useProductStore()
const { getProducts } = productStore
const { products } = storeToRefs(productStore)

onMounted(() => {
    getProducts()
})
</script>

<template>
    <div>
        <VRow v-if="products?.length">
            <VCol v-for="product in products" :key="product?.id" cols="12" md="6" lg="4">
                <Card :product="product" />
            </VCol>
        </VRow>
        <p v-else class="text-h5 mb-4">No products as of now...</p>
    </div>
</template>


<style scoped></style>