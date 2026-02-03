export type Account = {
    marks: { text: string }[]
    recordType: 'local' | 'ldap'
    login: string
    password: string | null
}