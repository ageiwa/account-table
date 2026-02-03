import type { Mark, RecordType } from './types'

export function marksToArray(marks: string) {
    return marks
        .split(';')
        .filter(mark => mark.trim() !== '')
        .map(mark => ({ text: mark.trim() }))
}

export function marksToString(mark: Mark[]) {
    return mark
        .map(mark => mark.text)
        .join('; ')
}

export function isRecordType(str: any): str is RecordType {
    return typeof str === 'string'
        && (str === 'Локальная' || str === 'LDAP')
}