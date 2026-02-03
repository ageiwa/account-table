<script setup lang="ts">
    import { DataTable, Column, InputText, Select } from 'primevue'
    import CreateAccount from '@/features/CreateAccount/CreateAccount.vue'
    import { RECORD_TYPE_LIST } from '@/entities/Account/constants'
    import { useAccountsList } from './model'
    import type { TableAccount } from './types'
    import './style.css'

    const {
        tableAccounts,
        addAccount,
        checkAccount,
        changeType,
        onChangeAccount
    } = useAccountsList()
</script>

<template>
    <div class="accounts-list">
        <div class="accounts-list__header">
            <span class="header__title">
                Учетные записи
            </span>

            <CreateAccount @click="addAccount" />
        </div>
        
        <DataTable class="accounts-list__table" tableStyle="min-width: 50rem" :value="tableAccounts">
            <Column header="Метки">
                <template #body="{ data, index }: { data: TableAccount, index: number }">
                    <InputText
                        type="text"
                        :invalid="data.showMarksError"
                        v-model="data.marks"
                        @blur="() => checkAccount(index)"
                        @change="onChangeAccount"
                    />
                </template>
            </Column>

            <Column header="Тип записи">
                <template #body="{ data, index }: { data: TableAccount, index: number }">
                    <Select
                        placeholder="Выберите тип"
                        :options="RECORD_TYPE_LIST"
                        @change="e => changeType(e, index)"
                    >
                        <template #value>
                            {{ data.recordType }}
                        </template>
                    </Select>
                </template>
            </Column>
            
            <Column header="Логин">
                <template #body="{ data, index }: { data: TableAccount, index: number }">
                    <InputText
                        type="text"
                        :invalid="data.showLoginError"
                        v-model="data.login"
                        @blur="() => checkAccount(index)"
                        @change="onChangeAccount"
                    />
                </template>
            </Column>
            
            <Column header="Пароль">
                <template #body="{ data, index }: { data: TableAccount, index: number }">
                    <InputText v-if="data.password !== null"
                        type="password"
                        :invalid="data.showPasswordError"
                        v-model="data.password"
                        @blur="() => checkAccount(index)"
                        @change="onChangeAccount"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>