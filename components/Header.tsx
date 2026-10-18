"use client";

// The header, with the active page and a mobile menu: client-side navigation (next/link), as most
// Next.js sites do. Kora's toolbar has to follow these page changes without a reload.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Art";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La carte" },
  { href: "/le-lieu", label: "Le lieu" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <Logo /> Café Boréal
        </Link>
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <nav id="menu" className={`nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
