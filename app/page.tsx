import Link from "next/link";
import { BeanIcon, HeroArt } from "@/components/Art";
import { Testimonials } from "@/components/Testimonials";
import { posts } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">Torréfacteur · Lyon 2e</p>
            <h1 id="titre">Des cafés torréfiés ici, servis avec soin, du lundi au dimanche</h1>
            <p className="lead">Nous sélectionnons nos grains chez de petits producteurs et les torréfions chaque semaine, dans l’atelier au fond de la salle.</p>
            <div className="actions">
              <Link className="button" href="/carte">
                Voir la carte
              </Link>
              {/* Demo flaws: a typo, and a pale button hard to read. */}
              <Link className="button is-pale" href="/contact">
                Réservé une table
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <HeroArt />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Notre maison</p>
            <h2>Trois raisons de pousser la porte</h2>
          </div>
          <div className="cards">
            <article className="card">
              <span className="icon">
                <BeanIcon />
              </span>
              <h3>Torréfié sur place</h3>
              <p>Chaque mardi, nos cafés sortent du torréfacteur. Vous les buvez au meilleur de leur forme.</p>
            </article>
            <article className="card">
              <span className="icon">
                <BeanIcon />
              </span>
              <h3>Fait maison</h3>
              <p>Cookies, banana bread et cannelés sortent du four chaque matin.</p>
            </article>
            <article className="card">
              <span className="icon">
                <BeanIcon />
              </span>
              <h3>Un cappuccino à 4,50 €</h3>
              <p>Lait entier ou avoine, comme vous l’aimez.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div>
            <h2>Le brunch revient le dimanche</h2>
            <p>De 10 h à 14 h, formule Boréal à 21 €.</p>
          </div>
          <Link className="button is-ghost on-dark" href="/carte">
            Découvrir le brunch
          </Link>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">Ils en parlent</p>
            <h2>Ce que disent nos habitués</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Journal</p>
            <h2>Les dernières nouvelles</h2>
          </div>
          <div className="cards">
            {posts.map((post) => (
              <article className="card" key={post.slug}>
                <small className="date">{post.date}</small>
                <h3>
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
