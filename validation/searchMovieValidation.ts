import { z } from "zod";

export const searchMovieSchema = z.object({
  movie: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

export type SearchMovieType = z.infer<typeof searchMovieSchema>;
