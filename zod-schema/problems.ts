import * as z from "zod";

export const Problem = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()),
  template: z.string(),
  tests: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
    }),
  ),
});

export type Problem = z.infer<typeof Problem>;
