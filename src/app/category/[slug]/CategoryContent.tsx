"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import {
  API_BASE,
  toBengaliNumber,
  type Category,
  type Product,
} from "@/lib/utils";

export default function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const loading = loadedSlug !== slug;

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/products?category=${slug}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      }),
      fetch(`${API_BASE}/categories/${slug}`).then((res) => {
        if (!res.ok) return null;
        return res.json();
      }),
    ])
      .then(([prods, cat]) => {
        setProducts(prods);
        setCategory(cat);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoadedSlug(slug);
      });
  }, [slug]);

  const sortedProducts =
    sortBy === "low-high"
      ? [...products].sort((a, b) => a.today - b.today)
      : sortBy === "high-low"
        ? [...products].sort((a, b) => b.today - a.today)
        : products;

  if (!loading && !category) {
    return (
      <div className="py-16 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-500">
          দুঃখিত, এই ক্যাটাগরিটি খুঁজে পাওয়া যাচ্ছে না।
        </p>
        <Link
          href="/"
          className="btn mt-6 border-none bg-green-700 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-4xl">
            {category?.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-end rounded-xl bg-white px-4 py-3 shadow-sm">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {!loading && products.length > 0 && (
        <p className="mb-4 text-sm text-gray-500">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-36 rounded-xl bg-white"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
