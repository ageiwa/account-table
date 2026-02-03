import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from './types'

export const useAccountStore = defineStore('account', () => {
    const lastId = ref(0)
    const accounts = ref<Account[]>([])

    function setLastId(value: number) {
        lastId.value = value
    }

    function increaseId() {
        lastId.value++
    }

    function setAccounts(value: Account[]) {
        accounts.value = value
    }

    function addAccount(account: Account) {
        accounts.value.push(account)
    }

    function updateAccount(index: number, account: Account) {
        if (accounts.value[index]) {
            accounts.value[index] = account
        }
    }

    return {
        lastId,
        accounts,
        setLastId,
        increaseId,
        setAccounts,
        addAccount,
        updateAccount
    }
})