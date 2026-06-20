import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold font-mono mb-4">404</h1>
        <p className="text-muted-foreground mb-8">
          this page doesn&apos;t exist. maybe it was never here.
        </p>
        <Link href="/" className="text-primary hover:underline font-mono">
          back home
        </Link>
      </div>
    </div>
  )
}
