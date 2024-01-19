import { z } from "zod";

export const stepOneOrphanageSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  about: z.string().min(1, "A descrição é obrigatória"),
});

export type StepOneOrphanageSchemaType = z.infer<typeof stepOneOrphanageSchema>;
