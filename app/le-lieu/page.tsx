import type { Metadata } from "next";
import { ShopArt } from "@/components/Art";
import { address } from "@/lib/content";

export const metadata: Metadata = { title: "Le lieu" };

export default function PlacePage() {
  return (
    <>
      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">Le lieu</p>
            <h1>Un ancien atelier de tanneurs</h1>
            <p className="lead">Hauts plafonds, grandes fenêtres et une cour au calme : nous avons ouvert en 2019, au rez-de-chaussée d’un atelier du XIXe siècle.</p>
          </div>
          {/* Demo flaw: Saturday closes at 19 h here, 18 h in the footer. */}
          <dl className="hours" aria-label="Horaires">
            <div>
              <dt>Mardi – vendredi</dt>
              <dd>8 h – 18 h</dd>
            </div>
            <div>
              <dt>Samedi</dt>
              <dd>9 h – 19 h</dd>
            </div>
            <div>
              <dt>Dimanche</dt>
              <dd>Brunch 10 h – 14 h</dd>
            </div>
            <div>
              <dt>Lundi</dt>
              <dd>Fermé</dd>
            </div>
          </dl>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="gallery">
            {[0, 1, 2].map((variant) => (
              <figure key={variant}>
                <ShopArt variant={variant} />
              </figure>
            ))}
          </div>
          <p className="address">
            {address.street}, {address.city} · Métro Cordeliers
          </p>
        </div>
      </section>
    </>
  );
}
