import type { Metadata } from "next";
import { MenuTabs } from "@/components/MenuTabs";

export const metadata: Metadata = { title: "La carte" };

export default function MenuPage() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">La carte</p>
          <h1>À boire, à grignoter</h1>
          <p className="lead">Nos prix s’entendent service compris. Lait d’avoine sans supplément.</p>
        </div>
        <MenuTabs />
      </div>
    </section>
  );
}
