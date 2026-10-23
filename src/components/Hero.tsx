"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const today = useSyncExternalStore(
    () => () => {},
    () => getBanglaDate(),
    () => ""
  );

  return (
    <section>
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10 md:flex-row md:justify-between">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {today}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-5 rounded-xl border-none bg-green-700 text-white"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/hero.png"
          alt="বাজারের ঝুড়ি"
          width={315}
          height={263}
          className="h-auto w-56 sm:w-72"
          priority
        />
      </div>
    </section>
  );
}
