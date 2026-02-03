<script setup lang="ts">
    import { DataTable, Column } from 'primevue'
    import CreateAccount from '@/features/CreateAccount/CreateAccount.vue'
    import './style.css'

    const products: any[] = []

    for (let i = 0 ; i < 10; i++) {
        products.push({
            code: 'hello',
            name: 'name',
            category: 'Category',
            quantity: 'Quantity'
        })
    }
</script>

<template>
    <div class="accounts-list">
        <div class="accounts-list__header">
            <span class="header__title">
                Учетные записи
            </span>

            <CreateAccount />
        </div>
        
        <DataTable class="accounts-list__table" tableStyle="min-width: 50rem" :value="products">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
</template>