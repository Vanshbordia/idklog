import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import { LogList } from "./log-list"

const SITE_URL = "https://idklog.pages.dev"

export const metadata: Metadata = {
  title: "Log",
  description: "A log of obscure technical discoveries, brain dumps, and random bullshit",
  alternates: {
    canonical: `${SITE_URL}/log`,
  },
  openGraph: {
    title: "Log | idklog",
    description: "A log of obscure technical discoveries, brain dumps, and random bullshit",
    url: `${SITE_URL}/log`,
  },
}

interface Post {
  slug: string
  title: string
  date: string
  category: string
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, '')
    const filePath = path.join(postsDirectory, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    const dateStr = data.date || new Date().toISOString()
    return {
      slug,
      title: data.title || 'Untitled',
      date: new Date(dateStr).toISOString(),
      category: data.category || 'uncategorized',
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function LogPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 tracking-tight font-mono">
        idklog<span className="text-primary">.</span>
      </h1>
      <LogList posts={posts} />
    </div>
  )
}
