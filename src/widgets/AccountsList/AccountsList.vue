<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { DataTable, Column, InputText, Select } from 'primevue'
    import type { SelectChangeEvent } from 'primevue'
    import CreateAccount from '@/features/CreateAccount/CreateAccount.vue'
    import { useAccountStore } from '@/entities/Account/store'
    import { RECORD_TYPE_LIST } from '@/entities/Account/constants'
    import type { Mark } from '@/entities/Account/types'
    import './style.css'

    const accountStore = useAccountStore()

    const marks = ref<string[]>([])

    function formatOutputMarks(mark: Mark[]) {
        return mark
            .map(mark => mark.text)
            .join('; ')
    }

    function changeMarks(index: number) {
        if (!marks.value[index]) {
            return
        }

        let accountMarks = marks.value[index]
            .split(';')
            .filter(mark => mark.trim() !== '')
            .map(mark => ({ text: mark.trim() }))

        accountStore.setMark(index, accountMarks)
        marks.value[index] = formatOutputMarks(accountMarks)
    }

    function changeType(e: SelectChangeEvent, index: number) {
        accountStore.setRecordType(index, e.value)
    }

    onMounted(() => {
        marks.value = accountStore.accounts.map(account => {
            return formatOutputMarks(account.marks)
        })
    })
</script>

<template>
    <div class="accounts-list">
        <div class="accounts-list__header">
            <span class="header__title">
                Учетные записи
            </span>

            <CreateAccount />
        </div>
        
        <DataTable class="accounts-list__table" tableStyle="min-width: 50rem" :value="accountStore.accounts">
            <Column header="Метки">
                <template #body="{ index }">
                    <InputText
                        type="text"
                        v-model="marks[index]"
                        @change="() => changeMarks(index)"
                    />
                </template>
            </Column>

            <Column header="Тип записи">
                <template #body="{ index }">
                    <Select
                        placeholder="Выберите тип"
                        :options="RECORD_TYPE_LIST"
                        @change="e => changeType(e, index)"
                    >
                        <template #value>
                            {{ accountStore.accounts[index]?.recordType }}
                        </template>
                    </Select>
                </template>
            </Column>
            
            <Column header="Логин">
                <template #body="slotProps">
                    <InputText
                        type="text"
                        :value="slotProps.data.login"
                    />
                </template>
            </Column>
            
            <Column header="Пароль">
                <template #body="slotProps">
                    <InputText
                        type="password"
                        :value="slotProps.data.password"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>