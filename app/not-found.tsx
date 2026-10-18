import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="wrap">
        <h1>Page introuvable</h1>
        <p>
          Cette page n’existe pas (ou plus). <Link href="/">Retour à l’accueil</Link>
        </p>
      </div>
    </section>
  );
}
