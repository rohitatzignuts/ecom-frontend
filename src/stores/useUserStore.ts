import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const userDetail = ref(JSON.parse(localStorage.getItem("user")) ?? {});

    return {
        userDetail
    }
})