import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Journal</p>
          <h1>Nouvelles du café</h1>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <small className="date">{post.date}</small>
              <h2>
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
