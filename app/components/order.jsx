"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams =
    typeof window !== "undefined" ? useSearchParams() : null;

  const itemsString = searchParams?.get("items");
  const items = itemsString ? JSON.parse(itemsString) : [];

  const { cart } = useCartStore();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
  }, [cart]);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const message = cart
      .map(
        (item) =>
          `${item.name} ${item.selectedOption ? `(${item.selectedOption})` : ""} ${
            item.selectedSize ? `(${item.selectedSize})` : ""
          } x${item.quantity} = ${item.price * item.quantity} PKR`
      )
      .join("\n");

    const url = `https://wa.me/923137164393?text=${encodeURIComponent(
      `Hello Hot & Souce Pizza! I would like to order:\n\n${message}\n\n*Total: ${total} PKR*`
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="p-8 mb-24 bg-slate-900 text-white">

      {/* --- Footer / Total Section --- */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-700 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 rounded-t-2xl border-t border-gray-200">
        <div className="text-lg font-semibold">
          Total: <span className="text-green-600">{total} PKR</span>
        </div>
        <button
          onClick={handleWhatsAppOrder}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition active:scale-95"
        >
          Place Order via WhatsApp
          <iconify-icon
            icon="mdi:whatsapp"
            width="24"
            height="24"
            style={{ verticalAlign: "middle" }}
          ></iconify-icon>
        </button>
      </div>

      {/* Page Footer */}
      <div className="text-center text-s text-gray-600">
        Made by <span className="font-medium ">Muhammad Hassan Manzoor </span>
         WhatsApp:{" "}
        <a
          href="https://wa.me/923137164393"
          target="_blank"
          className="font-medium"
        >
          0313-7164393
        </a>
      </div>
    </div>
  );
}