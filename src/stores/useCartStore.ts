/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from "pinia";
import { ref } from "vue";
import type { CartItem } from "@/types";

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<any[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

    const addCartItem = (item: CartItem) => {
        const existingItem = cartItems.value.find(citem => citem.id === item.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cartItems.value.push({ ...item, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const removeCartItem = (item: CartItem) => {
        const foundItem = cartItems.value.find(citem => citem.id === item.id);

        if (foundItem) {
            if (foundItem.quantity > 1) {
                foundItem.quantity--;
            } else {
                // Remove the item if quantity is 1 or less
                cartItems.value = cartItems.value.filter(citem => citem.id !== item.id);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };


    return { cartItems, addCartItem, removeCartItem };
});