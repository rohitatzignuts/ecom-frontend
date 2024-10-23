<script setup lang="ts">
const items = [
    { text: 'Products', icon: 'mdi-hanger', to: "/" },
    { text: 'Orders', icon: 'mdi-history', to: '/orders' },
    { text: 'Logout', icon: 'mdi-logout', to: "/" },
]
</script>

<template>
    <div>
        <VList class="pa-0">
            <VListItem v-for="(item, i) in items" :key="i" :value="item">
                <RouterLink :to="item.to">
                    <VBtn variant="plain" :prepend-icon="item.icon">
                        {{ item.text }}
                    </VBtn>
                </RouterLink>
            </VListItem>
        </VList>
    </div>
</template>


<style scoped>
a {
    text-decoration: none;
    color: white !important;
}
</style>