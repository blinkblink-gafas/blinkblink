import type { NextApiRequest, NextApiResponse } from "next";
import { getProduct } from "@/lib/catalog";
import type { Product } from "@/types/product";

type ErrorBody = { error: string };

/** GET /api/products/:slug */
export default function handler(req: NextApiRequest, res: NextApiResponse<Product | ErrorBody>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const slug = typeof req.query.slug === "string" ? req.query.slug : "";
  const product = getProduct(slug);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json(product);
}
