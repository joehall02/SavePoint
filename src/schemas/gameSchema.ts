import * as z from "zod";

const CONDITIONS = [
  "Very Good",
  "Good",
  "Okay",
  "Bad",
  "Very Bad"
] as const

export const createGameSchema = z.object({
  title: z.string(),
  condition: z.enum(CONDITIONS),
  notes: z.string(),
  boxIncluded: z.boolean(),
  rating: z.number(),
  igdbId: z.number(),
  platformId: z.number(),
})

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
    title: z.string().optional(),
    condition: z.enum(CONDITIONS).optional(),
    notes: z.string().optional(),
    boxIncluded: z.boolean().optional(),
    rating: z.number().optional(),
    platformId: z.number().optional(),
  })
  .strict() // Throw error if any unknown attributes are provided, even if known values are passed
  .refine((data) => {
    // Itterate over object to determine if one of the attributes is present, if not then throw
    // Data: ZodObject
    // .some: returns true if callback functions returns true for an elements in array
    // (value) => value !== undefined: callback function, determine if the value is not undefined
    return Object.values(data).some((value) => value !== undefined);
});

export const searchGameHomeSchema = z.object({
  searchParam: z.string()
})