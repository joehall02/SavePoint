import * as z from "zod";

export const createGameSchema = z.object({
  title: z.string(),
  condition: z.string(),
  notes: z.string(),
  rating: z.number(),
  igdb_id: z.number(),
  console_id: z.number(),
});
