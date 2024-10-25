<script setup lang="ts">
import axiosInstance from '@/axios';
import router from '@/router';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

// Stores
const userStore = useUserStore()
const { userDetail } = storeToRefs(userStore)
console.log(userDetail.value);
const items = [
    { text: 'Products', icon: 'mdi-hanger', to: "/", },
    { text: 'Orders', icon: 'mdi-history', to: '/orders' },
]

const handleLogout = async () => {
    if (confirm("Really!") == true) {
        await axiosInstance.post("auth/logout/")
        router.push("/login")
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
    } else {
        return
    }
}
</script>

<template>
    <div>
        <aside class="d-flex flex-column justify-space-between">
            <VList class="pa-0">
                <VListItem v-for="(item, i) in items" :key="i" :value="item">
                    <RouterLink :to="item.to">
                        <VBtn variant="plain" :prepend-icon="item.icon">
                            {{ item.text }}
                        </VBtn>
                    </RouterLink>
                </VListItem>
                <VListItem>
                    <VBtn variant="plain" prepend-icon="mdi-logout" @click="handleLogout">
                        Logout
                    </VBtn>
                </VListItem>
            </VList>

            <div>
                <VListItem>
                    <RouterLink to="/account">
                        <VBtn variant="plain" prepend-icon="mdi-account">
                            {{ userDetail?.username }}

                        </VBtn>
                    </RouterLink>
                </VListItem>
            </div>
        </aside>
    </div>
</template>


<style scoped>
a {
    text-decoration: none;
    color: white !important;
}
</style>