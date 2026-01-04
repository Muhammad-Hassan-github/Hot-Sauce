"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function Header() {
  const [showInstall, setShowInstall] = useState(false);

  const handleInstallClick = () => {
    alert("Install prompt logic here");
    setShowInstall(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl">
        <div className="p-4 space-y-3">

          {/* App Title */}
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Champions Shawarma
            </h1>
            <p className="text-sm text-slate-300">
              & Burger Point
            </p>
          </div>

          {/* Info Bar */}
          <div className="flex justify-between items-center bg-slate-800 rounded-xl px-3 py-2">

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <span className="text-lg">🏍️</span>
              <span>Free Home Delivery</span>
            </div>

            {/* Share Button */}
            <button
              onClick={() =>
                navigator.share?.({
                  title: "Champions Shawarma",
                  text: "Check our menu!",
                  url: window.location.href,
                })
              }
              className="flex items-center gap-1 bg-lime-400 text-slate-900 px-3 py-1.5 rounded-full
                         text-sm font-semibold shadow active:scale-95 transition"
            >
              <Icon icon="fluent:share-24-regular" width="16" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* INSTALL MODAL */}
      {showInstall && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-[90%] max-w-sm text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Install App
            </h3>

            <p className="text-sm text-slate-400">
              Get faster ordering and instant access from your home screen.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl font-semibold"
              >
                Install
              </button>

              <button
                onClick={() => setShowInstall(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl font-medium text-white"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
