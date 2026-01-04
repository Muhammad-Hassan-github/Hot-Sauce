"use client";

import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Home() {
  const searchParams =
    typeof window !== "undefined" ? useSearchParams() : null;

  const itemsString = searchParams?.get("items");
  const items = itemsString ? JSON.parse(itemsString) : [];

  const { cart, addItemToCart, removeItemFromCart } = useCartStore();

  return (
    <div className="bg-slate-900 text-white pb-7">
      {/* BACK BUTTON */}
      <div className="p-4">
        <Link href="/">
          <button
            className="flex items-center gap-2
                       bg-slate-800 text-white
                       px-4 py-2 rounded-full
                       shadow-md
                       hover:bg-slate-700
                       active:scale-95 transition"
          >
            <Icon icon="material-symbols:arrow-back-ios-new" width="18" />
            Back
          </button>
        </Link>
      </div>

      {/* ITEMS */}
      <div className="px-4 space-y-5">
        {items.map((item, index) => {
          const [selectedOption, setSelectedOption] = useState(
            item.options ? item.options[0] : null
          );
          const [selectedSize, setSelectedSize] = useState(
            item.size ? Object.keys(item.size)[0] : null
          );

          const price =
            selectedSize && item.size ? item.size[selectedSize] : item.price;

          const cartItem = cart.find(
            (c) =>
              c.id === `${item.name}-${selectedOption || ""}-${selectedSize || ""}`
          );

          const quantity = cartItem?.quantity || 0;

          const handleAdd = () => {
            addItemToCart({
              ...item,
              selectedOption,
              selectedSize,
              price,
              quantity: 1,
              id: `${item.name}-${selectedOption || ""}-${selectedSize || ""}`,
            });
          };

          const handleRemove = () => {
            if (quantity > 0) removeItemFromCart(cartItem.id);
          };

          return (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg
                         border border-slate-700"
            >
              {/* IMAGE */}
              <div className="relative h-36 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-yellow-400 text-sm">{item.desc}</p>
                  <p className="mt-1 font-semibold text-emerald-400">
                    {price} PKR
                  </p>
                </div>

                {/* OPTIONS */}
                {item.options && (
                  <div className="flex flex-wrap gap-2">
                    {item.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition
                          ${
                            selectedOption === opt
                              ? "bg-indigo-500 text-white"
                              : "bg-slate-700 text-slate-300"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* SIZES */}
                {item.size && (
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(item.size).map((sizeKey) => (
                      <button
                        key={sizeKey}
                        onClick={() => setSelectedSize(sizeKey)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition
                          ${
                            selectedSize === sizeKey
                              ? "bg-teal-500 text-white"
                              : "bg-slate-700 text-slate-300"
                          }`}
                      >
                        {sizeKey} • {item.size[sizeKey]}
                      </button>
                    ))}
                  </div>
                )}

                {/* CART CONTROLS */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleRemove}
                    disabled={quantity === 0}
                    className="h-8 w-8 rounded-full
                               bg-rose-500 text-white
                               disabled:opacity-40
                               active:scale-90 transition"
                  >
                    −
                  </button>

                  <span className="font-semibold">{quantity}</span>

                  <button
                    onClick={handleAdd}
                    className="h-8 w-8 rounded-full
                               bg-emerald-500 text-white
                               active:scale-90 transition"
                  >
                    +
                  </button>

                  {quantity > 0 && (
                    <button
                      onClick={handleRemove}
                      className="ml-auto text-xs text-rose-400 underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
