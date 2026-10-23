"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, updateUser, useSession } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-900 transition placeholder:text-gray-400 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none";

function InfoForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);
    if (error) {
      toast.error("আপডেট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      router.refresh();
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
      <h2 className="text-xl font-bold text-gray-900">তথ্য</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <label
          htmlFor="name"
          className="mb-2 block font-medium text-gray-800"
        >
          নাম
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-green-700 py-4 text-base font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "আপডেট"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ProfileContent() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Link
        href="/"
        className="mb-4 block text-sm text-gray-500 transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
      <h1 className="text-4xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-2 text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-8 flex items-center gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "প্রোফাইল"}
            className="h-24 w-24 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-4xl font-bold text-white">
            {user.name?.charAt(0) || "U"}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-2xl font-bold text-gray-900">{user.name}</p>
          <p className="mt-1 truncate text-gray-500">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="ml-auto shrink-0 rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <InfoForm initialName={user.name || ""} />
    </div>
  );
}
