import Link from "next/link";
import { notFound } from "next/navigation";
import {
  API_BASE,
  formatPrice,
  getUnitBn,
  getUnitShortBn,
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

function formatDecimal(value: number, digits: number): string {
  return toBengaliNumber(
    value.toLocaleString("en-IN", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
  );
}

function formatRowAverage(value: number): string {
  return toBengaliNumber(
    parseFloat(value.toFixed(2)).toLocaleString("en-IN")
  );
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
  const average =
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
    product.markets.length;

  const pct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const changeWord = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত আছে";
  const changeSign = isUp ? "+" : isDown ? "-" : "";
  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";
  const changeArrow = isUp ? "▲" : isDown ? "▼" : "—";

  const summary = [
    {
      label: "সর্বনিম্ন দাম",
      value: formatPrice(lowest),
      caption: "সবচেয়ে কম দামের বাজার",
      color: "text-green-600",
    },
    {
      label: "সর্বাধিক দাম",
      value: formatPrice(highest),
      caption: "সবচেয়ে বেশি দামের বাজার",
      color: "text-red-500",
    },
    {
      label: "গড় দাম",
      value: formatDecimal(average, 2),
      caption: "বাজারগুলোর আনুমানিক গড়",
      color: "text-green-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-700">
          হোম
        </Link>
        <span className="text-gray-300">{">"}</span>
        <Link
          href={`/category/${product.category}`}
          className="transition hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span className="text-gray-300">{">"}</span>
        <span className="font-medium text-gray-700">{product.nameBn}</span>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-6">
            <span className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#f7f5f0] text-7xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-2 text-gray-500">
                {getUnitBn(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-2 text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold text-gray-900">{changeWord}</span>
                {" · "}
                {changeSign}
                {pct}%
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#f3f7f3] px-10 py-6 text-center lg:ml-auto">
            <p className="text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-5xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>
            <p className="mt-1 text-gray-500">
              টাকা / {getUnitShortBn(product.unit)}
            </p>
            <p className={`mt-2 font-bold ${changeColor}`}>
              {changeArrow} {changeSign}
              {pct}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-6"
            >
              <p className="text-gray-500">{item.label}</p>
              <p className={`mt-2 ${item.color}`}>
                <span className="text-3xl font-bold">{item.value}</span>{" "}
                <span className="text-sm">টাকা</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold text-gray-900">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left font-bold text-gray-900">
                  বাজার
                </th>
                <th className="px-5 py-4 text-left font-bold text-gray-900">
                  বিভাগ
                </th>
                <th className="px-5 py-4 text-left font-bold text-gray-900">
                  সর্বনিম্ন
                </th>
                <th className="px-5 py-4 text-left font-bold text-gray-900">
                  সর্বোচ্চ
                </th>
                <th className="px-5 py-4 text-right font-bold text-gray-900">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr
                  key={m.market}
                  className={`border-b border-gray-100 ${
                    i % 2 === 1 ? "bg-[#f3f7f3]" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {m.market}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{m.division}</td>
                  <td className="px-5 py-4 text-gray-700">
                    {formatPrice(m.min)} টাকা
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {formatPrice(m.max)} টাকা
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-gray-900">
                    {formatRowAverage((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
