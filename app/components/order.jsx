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
      `Hello! I'd like to order:\n${message}\nTotal: ${total} PKR`
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="p-8 mb-24 bg-slate-900 text-white">
      {/* same JSX */}
    </div>
  );
}
