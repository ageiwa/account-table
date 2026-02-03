import { useAccountStore } from '@/entities/Account/store'
import { ACCOUNT_KEY, ID_KEY } from '@/entities/Account/constants'
import { MAX_MARKS_LEN, MAX_LOGIN_LEN, MAX_PASSWORD_LEN } from '@/entities/Account/constants'
import type { Account } from '@/entities/Account/types'

export function useSaveAccount() {
    const accountStore = useAccountStore()

    function marksIsValid(marks: string) {
        return marks.length <= MAX_MARKS_LEN
    }

    function loginIsValid(login: string) {
        return login.length > 0 && login.length <= MAX_LOGIN_LEN
    }

    function passwordIsValid(password: string) {
        return password.length > 0 && password.length <= MAX_PASSWORD_LEN
    }

    function saveAccount(account: Account) {
        const findIndex = accountStore.accounts
            .findIndex(acc => acc.id === account.id)

        if (findIndex === -1) {
            accountStore.addAccount(account)
            const jsonString = JSON.stringify(accountStore.accounts)
            localStorage.setItem(ID_KEY, account.id.toString())
            localStorage.setItem(ACCOUNT_KEY, jsonString)
        }
        else {
            accountStore.updateAccount(findIndex, account)
            const jsonString = JSON.stringify(accountStore.accounts)
            localStorage.setItem(ACCOUNT_KEY, jsonString)
        }
    }

    return {
        marksIsValid,
        loginIsValid,
        passwordIsValid,
        saveAccount
    }
}