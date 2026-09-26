import { z } from 'zod';

export const createAvailabilitySchema = z.object({
    body: z.object({
        startTime: z.string().datetime({ message: "Invalid ISO datetime" }),
        endTime: z.string().datetime({ message: "Invalid ISO datetime" })
    })
});

export const bulkCreateAvailabilitySchema = z.object({
    body: z.object({
        windows: z.array(
            z.object({
                startTime: z.string().datetime({ message: "Invalid ISO datetime" }),
                endTime: z.string().datetime({ message: "Invalid ISO datetime" })
            })
        ).min(1).max(50)
    })
});

export const availabilityQuerySchema = z.object({
  query: z.object({
      from: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/),

      to: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
    })
    .superRefine(({ from, to }, context) => {
      const effectiveTo = to ?? from;

      if (effectiveTo < from) {
        context.addIssue({
          code: "custom",
          path: ["to"],
          message: "`to` cannot be earlier than `from`",
        });
      }
    }),
});