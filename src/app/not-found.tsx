import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center">
      <p className="text-7xl">🔍</p>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="mt-3 text-gray-500">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যাচ্ছে না।
      </p>
      <Link
        href="/"
        className="btn mt-8 rounded-xl border-none bg-green-700 text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
