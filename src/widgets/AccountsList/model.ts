import { ref, onMounted } from 'vue'
import { useToast } from 'primevue'
import type { SelectChangeEvent } from 'primevue'
import { useSaveAccount } from '@/features/SaveAccount/model'
import { useGetAccount } from '@/features/GetAccount/model'
import { useDeleteAccount } from '@/features/DeleteAccount/model'
import { isRecordType, marksToArray, marksToString } from '@/entities/Account/utils'
import { useAccountStore } from '@/entities/Account/store'
import type { TableAccount } from './types'

export function useAccountsList() {
    const TOAST_LIFE = 3000
    const toast = useToast()

    const accountStore = useAccountStore()

    const {
        marksIsValid,
        loginIsValid,
        passwordIsValid,
        saveAccount
    } = useSaveAccount()

    const {
        getAccounts
    } = useGetAccount()

    const {
        deleteAccount
    } = useDeleteAccount()

    const tableAccounts = ref<TableAccount[]>([])
    const wasChanged = ref(false)

    function fillTable() {
        getAccounts()

        tableAccounts.value = accountStore.accounts.map(account => ({
            id: account.id,
            marks: marksToString(account.marks),
            recordType: account.recordType,
            login: account.login,
            password: account.password,
            showMarksError: false,
            showLoginError: false,
            showPasswordError: false
        }))
    }

    function changeType(e: SelectChangeEvent, index: number) {
        if (!tableAccounts.value[index] || !isRecordType(e.value)) {
            return
        }

        tableAccounts.value[index].recordType = e.value

        if (tableAccounts.value[index].recordType === 'LDAP') {
            tableAccounts.value[index].password = null
        }
        else {
            tableAccounts.value[index].password = ''
        }

        onChangeAccount()
        checkAccount(index)
    }

    function checkAccount(index: number) {
        if (!tableAccounts.value[index]) {
            return
        }

        tableAccounts.value[index].showMarksError = !marksIsValid(tableAccounts.value[index].marks)

        if (!tableAccounts.value[index].showMarksError) {
            const marks = marksToArray(tableAccounts.value[index].marks)
            tableAccounts.value[index].marks = marksToString(marks)
        }

        tableAccounts.value[index].showLoginError = !loginIsValid(tableAccounts.value[index].login)

        if (tableAccounts.value[index].password !== null) {
            tableAccounts.value[index].showPasswordError = !passwordIsValid(tableAccounts.value[index].password)
        }
        else {
            tableAccounts.value[index].showPasswordError = false
        }

        const isValid = !tableAccounts.value[index].showMarksError
            && !tableAccounts.value[index].showLoginError
            && !tableAccounts.value[index].showPasswordError

        if (isValid && wasChanged.value) {
            saveAccount({
                id: tableAccounts.value[index].id,
                marks: marksToArray(tableAccounts.value[index].marks),
                recordType: tableAccounts.value[index].recordType,
                login: tableAccounts.value[index].login,
                password: tableAccounts.value[index].password,
            })

            toast.add({
                summary: 'Запись сохранена',
                severity: 'success',
                life: TOAST_LIFE
            })
        }

        wasChanged.value = false
    }

    function onChangeAccount() {
        wasChanged.value = true
    }

    function addAccount() {
        accountStore.increaseId()

        tableAccounts.value.push({
            id: accountStore.lastId,
            marks: '',
            recordType: 'Локальная',
            login: '',
            password: '',
            showMarksError: false,
            showLoginError: false,
            showPasswordError: false
        })
    }

    function delAccount(id: number) {
        tableAccounts.value = tableAccounts.value
            .filter(acc => acc.id !== id)

        deleteAccount(id)

        toast.add({
            summary: 'Запись удалена',
            severity: 'success',
            life: TOAST_LIFE
        })
    }

    onMounted(() => {
        fillTable()
    })

    return {
        tableAccounts,
        addAccount,
        delAccount,
        changeType,
        checkAccount,
        onChangeAccount,
    }
}