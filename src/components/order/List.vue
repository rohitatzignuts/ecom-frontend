<script setup lang="ts">
import axiosInstance from '@/axios';
import { onMounted, ref } from 'vue';
import { toCurrency } from '@/helpers';
import moment from 'moment';
import { orderStatus } from '@/helpers';

// Reactive Data
const prevOrders = ref<unknown[]>([])

// Methods
const getPrevOrders = async () => {
    try {
        const response = await axiosInstance.get("api/orders/prev/")
        if (response?.status == 200) {
            prevOrders.value = response?.data
        }
    } catch (error) {
        console.log("Error getting prev orders: ", error);
    }
}

onMounted(() => {
    getPrevOrders()
})
</script>

<template>
    <div>
        <p class="text-h5 mb-4">Your previous orders...</p>
        <VList class="pa-0" activatable>
            <VListItem v-for="order in prevOrders" :key="order?.id" color="primary" variant="tonal">
                <RouterLink to="">
                    <div class="d-flex justify-space-between">
                        <div class="d-flex flex-column">
                            <div>
                                <span class="text-h6">Order #{{ order.id }}</span>
                                <VChip size="small" class="ms-4" :color="orderStatus(order?.status).color">{{
                                    orderStatus(order?.status).value }}</VChip>
                            </div>
                            <span class="text-body-2 rounded">
                                {{ moment(order?.created_at).format('lll') }}
                            </span>
                        </div>
                        <VChip color="primary">
                            {{ toCurrency(order?.total) }}
                        </VChip>
                    </div>
                </RouterLink>
            </VListItem>
        </VList>
    </div>
</template>


<style scoped>
a {
    text-decoration: none;
    color: white;
}
</style>