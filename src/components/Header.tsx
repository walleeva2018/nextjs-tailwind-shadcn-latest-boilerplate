"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { 
  Menu, 
  X, 
  Code2, 
  Building2, 
  Sun, 
  Moon, 
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>🎉 New: 500+ Remote IT Jobs Added This Week!</span>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Hot
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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



          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
        

            <Link href="/companies">
              <Button variant="ghost" className="font-medium">
                Companies
              </Button>
            </Link>

            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <Sparkles className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <span className="h-4 w-4 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t pt-4 pb-4 bg-muted/20 rounded-lg mt-2">
            <div className="space-y-1">
             
              <Link href="/companies" className="flex items-center px-3 py-3 rounded-md hover:bg-accent transition-colors">
                <Building2 className="h-4 w-4 mr-3" />
                <span className="font-medium">Companies</span>
              </Link>
              <Link href="/post-job" className="flex items-center px-3 py-3 rounded-md hover:bg-accent transition-colors">
                <Sparkles className="h-4 w-4 mr-3" />
                <span className="font-medium">Post Job</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}