<script setup lang="ts">
import { ref } from 'vue';
import SideNav from './components/SideNav.vue';
import Dialog from './components/cart/Dialog.vue';

const isCartOpen = ref(false)
</script>

<template>
  <VLayout class="rounded rounded-md">
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
  <Dialog :dialog="isCartOpen" @close-dialog="isCartOpen = false" />
</template>
<style scoped></style>