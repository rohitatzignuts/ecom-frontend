<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { toCurrency } from '@/helpers';

interface Props {
    product: unknown
}
const props = defineProps<Props>()

// Stores
const cartStore = useCartStore()
const { addCartItem } = cartStore

// Reactive Data
const show = ref(false)
</script>
<template>
    <VCard class="mx-auto" max-width="344">
        <VImg height="200px" :src="props.product?.image ?? 'illustration-shopping-online_53876-5906.jpg'" cover />

        <VCardTitle>
            {{ props.product?.name }}
        </VCardTitle>

        <VCardSubtitle>
            <VChip>
                {{ toCurrency(props.product?.price) }}
            </VChip>
        </VCardSubtitle>

        <VCardActions>
            <VBtn color="primary" text="Add to Cart" append-icon="mdi-cart" variant="outlined"
                @click="addCartItem(props.product)" />

            <v-spacer></v-spacer>

            <VBtn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></VBtn>
        </VCardActions>

        <VExpandTransition>
            <div v-show="show">
                <VDivider />

                <VCardText>
                    {{ props.product?.description }}
                </VCardText>
            </div>
        </VExpandTransition>
    </VCard>
</template>
