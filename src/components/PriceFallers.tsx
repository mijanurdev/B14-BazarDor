import type { Product } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function PriceFallers({ products }: { products: Product[] }) {
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
