export const ROLES = {
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR',
    ADMIN: 'ADMIN'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];


// Interview question
// WHy const why not enum - reverse mapping
