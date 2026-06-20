import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { LogList } from "./log-list"

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
