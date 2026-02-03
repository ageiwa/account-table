export type RecordType = 'Локальная' | 'LDAP'

export type Mark = {
    text: string
}

export type Account = {
    marks: Mark[]
    recordType: RecordType
    login: string
    password: string | null
}