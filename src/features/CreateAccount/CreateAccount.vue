<script setup lang="ts">
    import { Button } from 'primevue'
    import { useAccountStore } from '@/entities/Account/store'
    import './style.css'

    const accountStore = useAccountStore()
</script>

<template>
    <Button
        icon="pi pi-plus"
        aria-label="Add"
        @click="accountStore.addAccount"
    ></Button>
</template>