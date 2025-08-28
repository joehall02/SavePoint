import * as z from "zod";

export const createGameSchema = z.object({
  title: z.string(),
  condition: z.string(),
  notes: z.string(),
  boxIncluded: z.boolean(),
  rating: z.number(),
  igdbId: z.number(),
  platformId: z.number(),
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
  boxIncluded: z.boolean().optional(),
  rating: z.number().optional(),
  platformId: z.number().optional(),
});
