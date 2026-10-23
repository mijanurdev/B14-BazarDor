import Link from "next/link";
import {
  formatPrice,
  getUnitBn,
  toBengaliNumber,
  type Product,
} from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const pct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-4xl">
          {product.image}
        </span>
        <div>
          <h3 className="font-bold text-gray-800">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product.today)} টাকা
          </p>
        </div>
        {product.change.dir === "up" && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            ▲ {pct}%
          </span>
        )}
        {product.change.dir === "down" && (
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            ▼ {pct}%
          </span>
        )}
        {product.change.dir === "flat" && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
            — {pct}%
          </span>
        )}
      </div>
    </Link>
  );
}
