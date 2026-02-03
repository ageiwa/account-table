import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account, RecordType, Mark } from './types'

export const useAccountStore = defineStore('account', () => {
    const accounts = ref<Account[]>([])

    function addAccount() {
        accounts.value.push({
            marks: [],
            recordType: 'Локальная',
            login: '',
            password: ''
        })
    }

    function setMark(index: number, value: Mark[]) {
        if (accounts.value[index]) {
            accounts.value[index].marks = value
        }
    }

    function setRecordType(index: number, value: RecordType) {
        if (accounts.value[index]) {
            accounts.value[index].recordType = value
        }
    }

    return {
        accounts,
        addAccount,
        setMark,
        setRecordType
    }
})