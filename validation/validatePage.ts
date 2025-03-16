import z from "zod";

export const validatePage = z.string().transform((val) => ({
  page: Number(val),
}));

export const validateSearchParams = z.object({
  sort: z.string().optional(),
});
