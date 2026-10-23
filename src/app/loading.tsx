export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <div className="skeleton h-64 rounded-2xl bg-white"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton h-36 rounded-xl bg-white"></div>
        <div className="skeleton h-36 rounded-xl bg-white"></div>
        <div className="skeleton h-36 rounded-xl bg-white"></div>
        <div className="skeleton h-36 rounded-xl bg-white"></div>
        <div className="skeleton h-36 rounded-xl bg-white"></div>
        <div className="skeleton h-36 rounded-xl bg-white"></div>
      </div>
    </div>
  );
}
