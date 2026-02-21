import { NextResponse } from "next/server";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

function makeNews(): NewsItem[] {
  const now = new Date().toISOString();

  return [
    {
      id: "n1",
      title: "Platform Update: Admin CRUD is live",
      summary:
        "Admin users can now create, edit, and delete products using protected routes.",
      createdAt: now,
    },
    {
      id: "n2",
      title: "Performance: Added caching strategy",
      summary:
        "Public pages are optimized using caching and revalidation where appropriate.",
      createdAt: now,
    },
    {
      id: "n3",
      title: "Auth: Role-based access control",
      summary:
        "Middleware and server-side guards enforce protected routes and admin-only pages.",
      createdAt: now,
    },
  ];
}

export async function GET() {
  return NextResponse.json(makeNews());
}