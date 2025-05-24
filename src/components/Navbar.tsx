"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const menus = [
    { title: "Home", path: "/" },
    { title: "Recipes", path: "/recipes" },
    { title: "Categories", path: "/categories" },
    { title: "Favorites", path: "/favorites" },
  ]

  return (
    <nav className="bg-background w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">RecipeApp</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menus.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={menu.path}>{menu.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/search">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  >
                    {theme === "light" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="text-left">Navigation Menu</SheetTitle>
                <div className="flex flex-col items-start gap-4 pt-4">
                  {menus.map((menu) => (
                    <Button
                      key={menu.title}
                      variant="link"
                      className="text-base"
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href={menu.path}>{menu.title}</Link>
                    </Button>
                  ))}
                  <Button variant="link" className="text-base" asChild>
                    <Link href="/search" onClick={() => setOpen(false)}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Link>
                  </Button>
                  <Button
                    variant="link"
                    className="text-base"
                    onClick={() => {
                      setTheme(theme === "light" ? "dark" : "light")
                      setOpen(false)
                    }}
                  >
                    {theme === "light" ? (
                      <>
                        <Moon className="h-4 w-4 mr-2" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 mr-2" />
                        Light Mode
                      </>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}