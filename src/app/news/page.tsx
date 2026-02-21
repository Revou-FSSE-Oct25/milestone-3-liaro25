import { headers } from "next/headers";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

export const revalidate = 10; // demo ISR cepat

async function getBaseUrl() {
  const h = await headers();

  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  // fallback safety (harusnya jarang kejadian)
  if (!host) return "http://localhost:3000";

  return `${proto}://${host}`;
}

async function getNews(): Promise<NewsItem[]> {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/news`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">News (ISR Demo)</h1>
      <p className="text-sm text-gray-500 mt-2">
        Revalidates every 10 seconds. Refresh after 10s to see timestamps
        change.
      </p>

      <div className="mt-8 space-y-6">
        {news.map((item) => (
          <article key={item.id} className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.summary}</p>
            <p className="text-xs text-gray-400 mt-4">
              createdAt: {new Date(item.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
