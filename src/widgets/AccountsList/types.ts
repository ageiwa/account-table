import type { RecordType } from '@/entities/Account/types'

export type TableAccount = {
    id: number
    marks: string
    recordType: RecordType
    login: string
    password: string | null
    showMarksError: boolean
    showLoginError: boolean
    showPasswordError: boolean
}