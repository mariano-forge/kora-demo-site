import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { address } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section>
      <div className="wrap split align-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Une question, une privatisation ?</h1>
          <p className="lead">Écrivez-nous, nous répondons sous 48 h. Pour un événement, précisez la date et le nombre de personnes.</p>
          <p>
            {address.street}
            <br />
            {address.city}
            <br />
            {address.phone} · {address.email}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
