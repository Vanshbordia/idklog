import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }))
}

const SITE_URL = "https://idklog.pages.dev"
const SITE_NAME = "idklog"
const AUTHOR_NAME = "Vansh Bordia"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) return {}

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContent)
  const title = data.title || 'Untitled'
  const date = data.date ? new Date(data.date).toISOString() : undefined
  const category = data.category || undefined
  const description = data.description || `${title} - idklog`
  const url = `${SITE_URL}/log/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      locale: 'en_US',
      publishedTime: date,
      authors: [AUTHOR_NAME],
      tags: category ? [category] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

function BlogPostingJsonLd({
  title,
  description,
  date,
  category,
  slug,
}: {
  title: string
  description: string
  date: string | null
  category: string | null
  slug: string
}) {
  const url = `${SITE_URL}/log/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: date || undefined,
    keywords: category || undefined,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContent)
  const title = data.title || 'Untitled'
  const date = data.date ? new Date(data.date).toISOString() : null
  const category = data.category || null

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`)

  return (
    <div className="container mx-auto px-4 py-12">
      <BlogPostingJsonLd
        title={title}
        description={data.description || `${title} - idklog`}
        date={date}
        category={category}
        slug={slug}
      />
      <header className="mb-10 border-b border-border/50 pb-6">
        <h1 className="text-3xl font-bold tracking-tight font-mono mb-3">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted-foreground">
          {date && <time dateTime={date}>{date}</time>}
          {category && (
            <span className="px-2 py-0.5 rounded border border-border text-xs">
              {category}
            </span>
          )}
        </div>
      </header>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <Post />
      </article>
      <div className="mt-8 text-xs text-muted-foreground font-mono opacity-60">
        {"// file: /src/content/posts/" + slug + ".mdx"}
      </div>
    </div>
  )
}