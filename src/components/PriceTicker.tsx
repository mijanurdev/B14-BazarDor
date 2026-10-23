"use client";

import { useEffect, useState } from "react";
import {
  API_BASE,
  formatPrice,
  getUnitShortBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-green-100 bg-white py-2">
      <div className="animate-marquee flex w-max items-center">
        {tickerItems.map((product, index) => (
          <span
            key={`${product.id}-${index}`}
            className="inline-flex items-center gap-2 px-4 text-sm whitespace-nowrap"
          >
            <span>{product.image}</span>
            <span className="font-medium text-gray-800">{product.nameBn}</span>
            <span className="text-gray-600">
              {formatPrice(product.today)} টাকা/{getUnitShortBn(product.unit)}
            </span>
            {product.change.dir === "up" && (
              <span className="font-semibold text-red-600">
                ▲ {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            )}
            {product.change.dir === "down" && (
              <span className="font-semibold text-green-600">
                ▼ {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            )}
            {product.change.dir === "flat" && (
              <span className="font-semibold text-gray-500">
                — {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
