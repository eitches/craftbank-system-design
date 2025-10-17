import * as z from "zod";

export const orderQuerySchema = z.object({
  keyword: z.string().optional(),
  prefectureId: z.string().optional(),
  constructionTypeId: z.string().optional(),
});
