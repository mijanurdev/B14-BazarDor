"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { API_BASE, getBanglaDate, type Category } from "@/lib/utils";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const today = useSyncExternalStore(
    () => () => {},
    () => getBanglaDate(),
    () => ""
  );
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

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

  const linkClass = (isActive: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors ${
      isActive
        ? "bg-green-700 font-semibold text-white"
        : "bg-green-50 text-gray-700 hover:bg-green-200"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm px-2 lg:hidden"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label="মেনু"
              >
                ☰
              </button>
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 p-1">
                  <Image
                    src="/logo.png"
                    alt="বাজার দর লোগো"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-2xl leading-tight font-bold text-gray-900">
                    বাজার দর
                  </span>
                  <span className="text-xs text-gray-500">{today}</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {isPending ? (
                <span className="loading loading-spinner loading-sm text-green-700"></span>
              ) : session?.user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-sm gap-2 px-2 sm:btn-md"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "প্রোফাইল"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                        {session.user.name?.charAt(0) || "U"}
                      </span>
                    )}
                    <span className="hidden font-semibold text-gray-800 sm:inline">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-gray-500">▾</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu z-50 w-56 rounded-box border bg-white p-2 shadow-lg"
                  >
                    <li className="px-3 py-2">
                      <span className="flex flex-col items-start gap-0 hover:bg-transparent">
                        <span className="font-semibold text-gray-800">
                          {session.user.name}
                        </span>
                        <span className="text-xs break-all text-gray-500">
                          {session.user.email}
                        </span>
                      </span>
                    </li>
                    <li>
                      <Link href="/profile">👤 আমার প্রোফাইল</Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="text-red-600"
                      >
                        ↩ সাইন আউট
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="btn btn-outline btn-sm rounded-xl sm:btn-md"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    className="btn btn-sm rounded-xl border-none bg-green-700 text-white sm:btn-md"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>

          <nav className="hidden flex-wrap items-center justify-start gap-2 pb-3 lg:flex">
            <Link href="/" className={linkClass(pathname === "/")}>
              হোম
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={linkClass(pathname === `/category/${cat.slug}`)}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            ))}
          </nav>

          {mobileOpen && (
            <nav className="flex flex-col items-start gap-2 pb-3 lg:hidden">
              <Link
                href="/"
                className={linkClass(pathname === "/")}
                onClick={() => setMobileOpen(false)}
              >
                হোম
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={linkClass(pathname === `/category/${cat.slug}`)}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.icon} {cat.nameBn}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <PriceTicker />
    </>
  );
}
