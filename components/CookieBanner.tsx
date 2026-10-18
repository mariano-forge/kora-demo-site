"use client";

// The cookie banner most sites have, at the bottom of the screen: it sits where Kora's pill does, a
// realistic case for the toolbar. Remembered on the device once answered.

import { useSyncExternalStore } from "react";

const key = "cafe-boreal-cookies";
const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};
const answered = () => {
  try {
    return window.localStorage.getItem(key) !== null;
  } catch {
    return true;
  }
};

export function CookieBanner() {
  const hidden = useSyncExternalStore(subscribe, answered, () => true);
  if (hidden) return null;
  const answer = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Private mode: the banner comes back next time.
    }
    window.dispatchEvent(new StorageEvent("storage", { key }));
  };
  return (
    <div className="cookies" role="dialog" aria-label="Cookies">
      <p>Nous utilisons quelques cookies pour mesurer la fréquentation du site. Rien n’est revendu.</p>
      <div className="cookies-actions">
        <button type="button" className="button is-ghost" onClick={() => answer("refused")}>
          Refuser
        </button>
        <button type="button" className="button" onClick={() => answer("accepted")}>
          Accepter
        </button>
      </div>
    </div>
  );
}
