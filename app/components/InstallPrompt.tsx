"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Listen for PWA install prompt event
    const handler = (e: any) => {
      e.preventDefault(); // prevent default mini-prompt
      setDeferredPrompt(e);
      setShowPopup(true); // show custom popup
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // show native install prompt
    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg w-80 max-w-[90%] text-center space-y-4">
        <h3 className="text-lg font-bold">Install Pizza App?</h3>
        <p className="text-sm text-slate-300">
          Get the best food ordering experience on your home screen!
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleInstall}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Install Now
          </button>
          <button
            onClick={handleCancel}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white font-medium"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
