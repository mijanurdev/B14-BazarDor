import Link from "next/link";
import { notFound } from "next/navigation";
import {
  API_BASE,
  formatPrice,
  getUnitBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const lowest = Math.min(...product.markets.map((m) => m.min));
  const highest = Math.max(...product.markets.map((m) => m.max));
  const average = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );
  const pct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));

  const stats = [
    { label: "সর্বনিম্ন দাম", value: lowest },
    { label: "সর্বোচ্চ দাম", value: highest },
    { label: "গড় দাম", value: average },
  ];

  const history = [
    { label: "আজকের দাম", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহে", value: product.lastWeek },
    { label: "গত মাসে", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span> / </span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span> / </span>
        <span className="text-gray-800">{product.nameBn}</span>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-5xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-gray-500">
                {product.categoryIcon} {product.categoryNameBn} •{" "}
                {getUnitBn(product.unit)}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>
            <div className="mt-2">
              {product.change.dir === "up" && (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                  ▲ {pct}%
                </span>
              )}
              {product.change.dir === "down" && (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  ▼ {pct}%
                </span>
              )}
              {product.change.dir === "flat" && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                  — {pct}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-5 text-center shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatPrice(stat.value)} টাকা
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">দামের ইতিহাস</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {history.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-[#f3f7f3] p-4 text-center"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatPrice(item.value)} টাকা
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          বাজারভিত্তিক দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন (টাকা)</th>
                <th>সর্বোচ্চ (টাকা)</th>
                <th>গড় (টাকা)</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market}>
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td>{formatPrice(m.min)}</td>
                  <td>{formatPrice(m.max)}</td>
                  <td>{formatPrice(Math.round((m.min + m.max) / 2))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
