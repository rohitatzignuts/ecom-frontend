<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { toCurrency } from '@/helpers';
import axiosInstance from '@/axios';
import type { CartItem } from '@/types';

interface Props {
    dialog: boolean
}
const emit = defineEmits<{
    (e: 'closeDialog', value: boolean): void
}>()

// Stores
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { removeCartItem } = cartStore

// Reactive Data
const props = defineProps<Props>()

const cartTotal = computed(() => {
    return cartItems.value.reduce((acc, item) => {
        return acc + item?.price * item?.quantity
    }, 0)
})

// Methods
const confirmOrder = async () => {
    try {
        const orderResponse = await axiosInstance.post("orders/");
        const orderId = orderResponse.data.id;

        if (orderResponse.status === 201) {
            for (const item of cartItems.value) {
                const orderItemData = {
                    product: item.id,
                    order: orderId,
                    quantity: item.quantity,
                };
                await axiosInstance.post("order-item/", orderItemData);
            }

            // Alert and clear cart if order is successful
            alert("Order placed successfully!");
            cartItems.value = [];
            localStorage.removeItem("cart");
            emit("closeDialog", false)
        }
    } catch (error) {
        console.error("Error while confirming order:", error);
        alert("Failed to place the order. Please try again.");
    }
};

</script>

<template>
    <div class="text-center pa-4">
        <VDialog :model-value="props.dialog" transition="dialog-bottom-transition" fullscreen>
            <VCard>
                <VToolbar>
                    <VBtn icon="mdi-close" @click="emit('closeDialog', false)"></VBtn>
                    <VToolbarTitle>Cart</VToolbarTitle>
                    <VSpacer />
                    <VToolbarItems>
                        <VBtn text="Close" variant="text" @click="emit('closeDialog', false)"></VBtn>
                    </VToolbarItems>
                </VToolbar>

                <div v-if="cartItems?.length">
                    <!-- Cart Items  -->
                    <VList lines="two" subheader>
                        <VListItem v-for="cartItem in cartItems" :key="cartItem.id">
                            <template v-slot:prepend>
                                <VImg height="50" width="50" class="rounded-lg" cover
                                    :src="cartItem.image ?? 'illustration-shopping-online_53876-5906.jpg'" />
                            </template>
                            <div class="ms-4">
                                <VListItemTitle class="d-block">
                                    {{ cartItem.name }} x
                                    <VChip class="ma-2" label>
                                        <span>{{ cartItem.quantity }}</span>
                                    </VChip>
                                </VListItemTitle>
                                <span class="text-body-1 font-weight-medium">{{ toCurrency(cartItem.price) }}</span>
                            </div>
                            <template v-slot:append>
                                <VBtn color="grey-lighten-1" icon="mdi-close" variant="text"
                                    @click="removeCartItem(cartItem)" />
                            </template>
                        </VListItem>
                    </VList>

                    <VDivider />

                    <!-- Cart Total  -->
                    <div>
                        <div class="bg-primary">
                            <div class="d-flex justify-space-between px-4 py-1">
                                <span>Total</span>
                                <span>{{ toCurrency(cartTotal) }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Checkout  -->
                    <VCardActions class="my-4">
                        <VSpacer />
                        <VBtn variant="outlined" @click="confirmOrder">
                            Checkout
                        </VBtn>
                    </VCardActions>
                </div>
                <VCardTitle v-else>Your Cart is Empty!!</VCardTitle>

            </VCard>
        </VDialog>
    </div>
</template>

<style scoped></style>