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
    setMobileOpen(false);
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

  const menuItemClass =
    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-green-50";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="relative lg:hidden">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm px-2"
                  onClick={() => setMobileOpen((open) => !open)}
                  aria-label="মেনু"
                >
                  ☰
                </button>
                {mobileOpen && (
                  <div className="absolute top-full left-0 z-50 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                    <Link
                      href="/"
                      className={menuItemClass}
                      onClick={() => setMobileOpen(false)}
                    >
                      🏠 হোম
                    </Link>
                    {session?.user ? (
                      <>
                        <Link
                          href="/profile"
                          className={menuItemClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          👤 আমার প্রোফাইল
                        </Link>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className={`${menuItemClass} w-full text-left text-red-600`}
                        >
                          ↩ সাইন আউট
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/signin"
                          className={menuItemClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          🔑 সাইন ইন
                        </Link>
                        <Link
                          href="/signup"
                          className={menuItemClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          📝 সাইন আপ
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
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
                        className="h-8 w-8 rounded-full bg-green-50 object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                        <svg
                          viewBox="0 0 448 512"
                          className="h-5 w-5 text-green-700"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                      </span>
                    )}
                    <span className="hidden font-semibold text-gray-800 sm:inline">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <span className="text-xs text-gray-500">▾</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu z-50 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg"
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
                <div className="hidden items-center gap-2 md:flex">
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
                </div>
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

          <nav className="flex flex-wrap items-center justify-start gap-2 pb-3 lg:hidden">
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
        </div>
      </header>
      <PriceTicker />
    </>
  );
}
