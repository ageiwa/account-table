import { useAccountStore } from '@/entities/Account/store'

export function useAddAccount() {
    const accountStore = useAccountStore()

    function addAccount() {
        accountStore.addAccount()
    }

    return {
        addAccount
    }
}