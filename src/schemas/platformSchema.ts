import * as z from "zod";

export const getAllPlatformsSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string(),
});
