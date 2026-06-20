import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://idklog.pages.dev"),
  title: {
    default: "idklog",
    template: "%s | idklog",
  },
  description: "A log of obscure technical discoveries, brain dumps, and random bullshit",
  openGraph: {
    title: {
      default: "idklog",
      template: "%s | idklog",
    },
    description: "A log of obscure technical discoveries, brain dumps, and random bullshit",
    siteName: "idklog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "idklog",
      template: "%s | idklog",
    },
    description: "A log of obscure technical discoveries, brain dumps, and random bullshit",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
