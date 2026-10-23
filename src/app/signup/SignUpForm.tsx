"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition placeholder:text-gray-400 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none";

const passwordInputClass =
  "w-full rounded-xl border border-gray-200 bg-white py-3 pr-11 pl-4 text-sm text-gray-900 transition placeholder:text-gray-400 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none";

function EyeButton({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-green-700"
    >
      {show ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      )}
    </button>
  );
}

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: callbackUrl,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } else {
      toast.success("অ্যাকাউন্ট তৈরি সফল!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
      if (error) {
        toast.error("সোশ্যাল সাইন ইন শুরু করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("সোশ্যাল সাইন ইন শুরু করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="mt-2 mb-6 text-center text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit}>
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
              placeholder="যেমন: রহিম উদ্দিন"
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
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordInputClass}
              />
              <EyeButton
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="আবার লিখুন"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={passwordInputClass}
              />
              <EyeButton
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((v) => !v)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-semibold text-gray-800 transition hover:border-green-400"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.58v2.97h3.88c2.27-2.09 3.57-5.17 3.57-8.74z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-2.97c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.06A11.99 11.99 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.32A7.2 7.2 0 0 1 4.91 12c0-.81.14-1.59.38-2.32V6.62H1.28a12 12 0 0 0 0 10.76l4.01-3.06z"
              />
              <path
                fill="#EA4335"
                d="M12 4.73c1.76 0 3.35.61 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.28 6.62l4.01 3.06C6.23 6.84 8.88 4.73 12 4.73z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => handleSocial("github")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-semibold text-gray-800 transition hover:border-green-400"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#181717">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href={
              callbackUrl !== "/"
                ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
                : "/signin"
            }
            className="font-semibold text-green-700"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 block text-center text-sm text-gray-500 transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
