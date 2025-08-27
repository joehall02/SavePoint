import * as z from "zod";

export const createGameSchema = z.object({
  title: z.string(),
  condition: z.string(),
  notes: z.string(),
  rating: z.number(),
  igdb_id: z.number(),
  console_id: z.number(),
});

export const getAllGamesSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const editGameSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  condition: z.string().optional(),
  notes: z.string().optional(),
  rating: z.number().optional(),
  console_id: z.number().optional(),
});
