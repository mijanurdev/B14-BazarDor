export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="skeleton h-40 rounded-2xl bg-white"></div>
      <div className="skeleton mt-6 h-24 rounded-2xl bg-white"></div>
      <div className="skeleton mt-6 h-64 rounded-2xl bg-white"></div>
    </div>
  );
}
