"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/app/data/categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-4">

      {/* PAGE TITLE */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-bold tracking-wide">
          Menu Categories
        </h1>
        <p className="text-sm text-slate-400">
          Choose your favorite food
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="px-4  space-y-4">
        {categories.map((item, key) => (
          <Link
            key={key}
            href={`/items?items=${encodeURIComponent(
              JSON.stringify(item.items)
            )}`}
          >
            <div
              className="flex items-center bg-slate-800 rounded-2xl
                         border border-slate-700
                         overflow-hidden cursor-pointer
                         shadow-lg mb-4
                         active:scale-[0.98] transition"
            >
              {/* IMAGE */}
              <div className="relative h-24 w-24 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>
                <p className="text-sm text-slate-400">
                  {item.desc}
                </p>
              </div>

              {/* ARROW */}
            
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
