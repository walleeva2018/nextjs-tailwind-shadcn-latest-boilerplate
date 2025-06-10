import Link from "next/link"
import { Code2, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const topCompanies = [
    "BJIT Group",
    "Brain Station 23",
    "Tiger IT",
    "DataSoft",
    "Samsung R&D",
    "Optimizely"
  ]

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" }
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-background flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BDSeekers
                </span>
                <span className="text-xs text-muted-foreground leading-none font-medium">
                  Smart IT Jobs Platform
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bangladesh&apos;s leading IT job portal connecting talented professionals with top companies.
            </p>
          </div>

          {/* Top Companies */}
          <div className="space-y-4">
            <h4 className="font-semibold">Top Companies</h4>
            <ul className="space-y-2">
              {topCompanies.map((company) => (
                <li key={company}>
                  <Link 
                    href={`/companies/${company.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {company}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Post Jobs & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold">For Employers</h4>
              <Link href="/post-job">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                  Post a Job
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-9 w-9 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200"
                    >
                      <Link href={social.href} aria-label={social.label}>
                        <Icon className="h-4 w-4" />
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} BDSeekers. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}