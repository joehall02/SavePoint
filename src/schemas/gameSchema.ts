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

export const getGameDetailsSchema = z.object({
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

export const editGameSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().optional(),
    condition: z.string().optional(),
    notes: z.string().optional(),
    boxIncluded: z.boolean().optional(),
    rating: z.number().optional(),
    platformId: z.number().optional(),
  })
  .refine((data) => {
    // Itterate over object to determine if one of the attributes is present
    // Data: ZodObject
    // .some: returns true if callback functions returns true for an elements in array
    // (value) => value !== undefined: callback function, determine if the value
    return Object.values(data).some((value) => value !== undefined);
  });
