<script setup lang="ts">
    import { DataTable, Column, InputText, Select, Button } from 'primevue'
    import { RECORD_TYPE_LIST } from '@/entities/Account/constants'
    import Note from '@/shared/ui/Note/Note.vue'
    import { useAccountsList } from './model'
    import type { TableAccount } from './types'
    import './style.css'

    const {
        tableAccounts,
        addAccount,
        delAccount,
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

            <Button
                icon="pi pi-plus"
                @click="addAccount"
            ></Button>
        </div>

        <Note class="accounts-list__note">
            Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </Note>
        
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

            <Column>
                <template #body="{ data }: { data: TableAccount }">
                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        @click="() => delAccount(data.id)"
                    ></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>