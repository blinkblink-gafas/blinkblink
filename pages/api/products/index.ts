import type { NextApiRequest, NextApiResponse } from "next";
import { listProducts } from "@/lib/catalog";
import type { Product } from "@/types/product";

type ErrorBody = { error: string };

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** GET /api/products?category=sunglasses&q=aviator */
export default function handler(req: NextApiRequest, res: NextApiResponse<Product[] | ErrorBody>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const products = listProducts({
    category: single(req.query.category),
    q: single(req.query.q),
  });

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json(products);
}
