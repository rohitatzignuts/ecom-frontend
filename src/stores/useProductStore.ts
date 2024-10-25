import axiosInstance from "@/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('products', () => {
    const products = ref<unknown[]>([])

    const getProducts = async () => {
        try {
            const response = await axiosInstance.get('api/products/')
            if (response?.data?.length) {
                products.value = response?.data
            }
        } catch (error) {
            console.log("Error getting products : ", error);
        }
    }

    return {
        products,
        getProducts
    }
})