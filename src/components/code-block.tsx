"use client"

import { useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const language = className?.replace('language-', '') || ''

  const copyToClipboard = async () => {
    if (preRef.current) {
      const text = preRef.current.textContent || ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const hasHeader = title || language

  return (
    <div className="relative border rounded-lg overflow-hidden group bg-muted/30">
      {hasHeader && (
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground truncate">
            {title || language}
          </span>
          <div className="flex items-center gap-2">
            {title && language && (
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                {language}
              </span>
            )}
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}
      {!hasHeader && (
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted z-10"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      )}
      <pre
        ref={preRef}
        className={`${className ?? ''} p-4 m-0 overflow-x-auto text-sm border-0 bg-transparent`}
      >
        {children}
      </pre>
    </div>
  )
}
