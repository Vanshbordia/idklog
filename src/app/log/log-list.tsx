"use client"

import Link from "next/link"
import { useState } from "react"

interface Post {
  slug: string
  title: string
  date: string
  category: string
}

export function LogList({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [...new Set(posts.map((p) => p.category))].sort()
  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 text-sm font-mono rounded border transition-colors ${
            activeCategory === null
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border hover:border-primary hover:text-primary"
          }`}
        >
          all
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            className={`px-3 py-1 text-sm font-mono rounded border transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="group border-b border-border/50 pb-6 transition-colors hover:border-border"
          >
            <h2 className="text-xl font-semibold mb-2 font-mono">
              <Link
                href={`/log/${post.slug}`}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-border">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground font-mono">
                {post.date}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
