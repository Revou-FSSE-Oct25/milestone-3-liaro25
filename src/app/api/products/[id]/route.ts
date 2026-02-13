import { NextResponse } from "next/server";
import { api } from "@/lib/api";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  try {
    const res = await api.get(`/products/${id}`);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.message ?? err?.message ?? "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const res = await api.put(`/products/${id}`, body);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.message ?? err?.message ?? "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  try {
    const res = await api.delete(`/products/${id}`);
    return NextResponse.json(res.data ?? { ok: true }, { status: 200 });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.message ?? err?.message ?? "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}
