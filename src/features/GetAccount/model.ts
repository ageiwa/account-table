import { useAccountStore } from '@/entities/Account/store'
import type { Account } from '@/entities/Account/types'
import { ACCOUNT_KEY } from '@/entities/Account/constants'
import { ID_KEY } from '@/entities/Account/constants'

export function useGetAccount() {
    const accountStore = useAccountStore()

    function getAccounts() {
        const idString = localStorage.getItem(ID_KEY)
        const accountsString = localStorage.getItem(ACCOUNT_KEY)

        if (accountsString === null || idString === null) {
            return
        }

        try {
            const lastId = parseInt(idString)
            accountStore.setLastId(lastId)
        }
        catch (err) {
            localStorage.removeItem(ID_KEY)
            localStorage.removeItem(ACCOUNT_KEY)
            return
        }

        try {
            const accounts: Account[] = JSON.parse(accountsString)
            accountStore.setAccounts(accounts)
        }
        catch (err) {
            localStorage.removeItem(ID_KEY)
            localStorage.removeItem(ACCOUNT_KEY)
        }
    }

    return {
        getAccounts
    }
}