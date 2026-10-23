"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition placeholder:text-gray-400 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none";

export default function UpdateForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
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
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-gray-900">
        প্রোফাইল আপডেট
      </h1>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-gray-800"
          >
            নাম
          </label>
          <input
            id="name"
            type="text"
            placeholder="আপনার নাম"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-gray-800"
          >
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-400">
            ইমেইল পরিবর্তন করা যাবে না
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn flex-1 rounded-xl border-none bg-green-700 text-white"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "সংরক্ষণ করুন"
            )}
          </button>
          <Link href="/profile" className="btn btn-outline flex-1 rounded-xl">
            বাতিল
          </Link>
        </div>
      </form>
    </div>
  );
}
