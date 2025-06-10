import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Provider/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BDSeekers - IT Jobs in Bangladesh | Find Your Dream Tech Career",
  description: "Bangladesh's leading IT job portal. Find software developer, data scientist, UI/UX designer and other tech jobs. Connect with top IT companies in BD.",
  keywords: "IT jobs Bangladesh, software developer jobs BD, tech careers Dhaka, programming jobs",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}