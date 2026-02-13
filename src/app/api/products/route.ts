import { NextResponse } from "next/server";
import { api } from "@/lib/api";

// GET /api/products → List Product
export async function GET() {
  const res = await api.get("/products");
  return NextResponse.json(res.data);
}

// POST /api/products → Create Product (ADMIN)
export async function POST(req: Request) {
  const body = await req.json();

  const res = await api.post("/products", {
    title: body.title,
    price: body.price,
    description: body.description,
    categoryId: body.categoryId,
    images: body.images,
  });

  return NextResponse.json(res.data, { status: 201 });
}
