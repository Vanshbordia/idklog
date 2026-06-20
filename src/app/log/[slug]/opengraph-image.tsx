import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContent)
  const title = data.title || 'Untitled'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          color: '#fafafa',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 80px 120px 80px',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#6366f1',
              marginBottom: 32,
            }}
          >
            ~/idklog
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 720,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '80px 80px 120px 0',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 80,
              height: 1,
              background: '#6366f1',
              marginBottom: 16,
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            idklog
          </div>
        </div>
      </div>
    )
  )
}
