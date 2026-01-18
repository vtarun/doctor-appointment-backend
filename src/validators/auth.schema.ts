import z from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.string()
            .email('Invalid email format')
            .max(254, 'Email must be less than 255 characters'), // RFC 5321 limit
        password: z.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(128, 'Password must be less than 129 characters')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    }),
});


export const registerSchema = z.object({
    body: z.object({
        name: z.string()
            .min(1, 'Name is required')
            .max(100, 'Name must be less than 101 characters')
            .trim(),
        email: z.string()
            .email('Invalid email format')
            .max(254, 'Email must be less than 255 characters'),
        password: z.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(128, 'Password must be less than 129 characters')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    }),
});