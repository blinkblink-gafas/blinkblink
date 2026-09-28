import type { NextApiRequest, NextApiResponse } from "next";
import { getTranslation } from "@/lib/i18n";
import { getMockCategories } from "@/lib/mockData";
import type { Category } from "@/types/category";

type ErrorBody = { error: string };

/** GET /api/categories */
export default function handler(req: NextApiRequest, res: NextApiResponse<Category[] | ErrorBody>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  return res.status(200).json(getMockCategories(getTranslation()));
}
