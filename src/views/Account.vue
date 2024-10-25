<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userDetail } = storeToRefs(userStore)
</script>

<template>
    <div>
        <v-card class="mx-auto" prepend-icon="mdi-account" :subtitle="userDetail?.email" :title="userDetail?.username">
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
        </v-card>
    </div>
</template>


<style scoped></style>