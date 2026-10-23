import { toBengaliNumber, type Product } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="সব-পণ্য" className="scroll-mt-32">
      <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
      <p className="mb-4 text-sm text-gray-500">
        মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
