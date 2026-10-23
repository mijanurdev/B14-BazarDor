import CategoryContent from "./CategoryContent";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <CategoryContent params={params} />
    </div>
  );
}
