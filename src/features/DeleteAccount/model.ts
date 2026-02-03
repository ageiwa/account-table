import { useAccountStore } from '@/entities/Account/store'
import { ACCOUNT_KEY } from '@/entities/Account/constants'

export function useDeleteAccount() {
    const accountStore = useAccountStore()

    function deleteAccount(id: number) {
        accountStore.deleteAccount(id)
        const jsonString = JSON.stringify(accountStore.accounts)
        localStorage.setItem(ACCOUNT_KEY, jsonString)
    }

    return {
        deleteAccount
    }
}