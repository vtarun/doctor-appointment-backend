export interface IUser{
    name: string,
    email: string,
    role: 'PATIENT'| 'DOCTOR'| 'ADMIN',
    plan: 'free_user'| 'standard'| 'premium'
}