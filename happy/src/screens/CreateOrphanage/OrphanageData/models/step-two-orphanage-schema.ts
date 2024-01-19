import { z } from "zod";

export const stepTwoOrphanageSchema = z.object({
  instructions: z.string().min(1, "As instruções estão obrigatórias"),
  opening_hours: z.string().min(1, "A descrição é obrigatória"),
  opening_on_weekends: z.boolean().default(false),
});

export type StepTwoOrphanageSchemaType = z.infer<typeof stepTwoOrphanageSchema>;
