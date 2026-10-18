import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: posts.find((candidate) => candidate.slug === slug)?.title ?? "Article" };
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) notFound();
  return (
    <section>
      <article className="wrap article">
        <Link href="/journal">← Journal</Link>
        <small className="date">{post.date}</small>
        <h1>{post.title}</h1>
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </section>
  );
}
