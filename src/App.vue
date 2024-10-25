<script setup lang="ts">
import { computed, ref } from 'vue';
import SideNav from './components/SideNav.vue';
import Dialog from './components/cart/Dialog.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isCartOpen = ref(false)
const useLayout = computed(() => route.meta.layout !== false);
</script>

<template>
  <VLayout v-if="useLayout" class="rounded rounded-md">
    <VAppBar class="px-4">
      <VAppBarTitle>Diddy Store</VAppBarTitle>
      <VBtn append-icon="mdi-cart" variant="outlined" @click="isCartOpen = true">Cart</VBtn>
    </VAppBar>

    <VNavigationDrawer>
      <VList>
        <SideNav />
      </VList>
    </VNavigationDrawer>

    <VMain style="min-height: 100vh;">
      <VContainer>
        <RouterView />
      </VContainer>
    </VMain>
  </VLayout>
  <RouterView v-else />
  <Dialog :dialog="isCartOpen" @close-dialog="isCartOpen = false" />
</template>

<style scoped></style>