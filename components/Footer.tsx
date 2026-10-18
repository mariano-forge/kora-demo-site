import Link from "next/link";
import { address } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <strong>Café Boréal</strong>
          <br />
          {address.street}, {address.city}
        </div>
        {/* Demo flaw: Saturday closes at 18 h here, 19 h on « Le lieu ». */}
        <div>Du mardi au samedi, 8 h – 18 h · dimanche brunch 10 h – 14 h</div>
        <div>
          <Link href="/contact">Nous écrire</Link> · {address.phone}
        </div>
      </div>
    </footer>
  );
}
