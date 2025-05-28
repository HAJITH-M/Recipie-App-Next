"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sun, Moon, User, LogOut } from "lucide-react"
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
import { useRouter } from "next/navigation"
import { getUsernameFromToken, handleLogout } from "@/lib/auth"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [username, setUsername] = React.useState<string | null>(null)

  React.useEffect(() => {
    const uname = getUsernameFromToken();
    setUsername(uname);
  }, []);

  const menus = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Recipes", path: "/recipes" },
    { title: "Categories", path: "/dashboard/categories" },
    { title: "Favorites", path: "/dashboard/favorites" },
  ]

  return (
    <nav className="bg-amber-50 dark:bg-black w-full border-b border-amber-200 dark:border-amber-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-amber-200 dark:ring-amber-800 ring-offset-2 ring-offset-amber-50 dark:ring-offset-amber-950">
                <Image
                  src="https://ik.imagekit.io/k5gvskw6y/image.png"
                  alt="Recipe App Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent">
                RecipeApp
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menus.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    <NavigationMenuLink
                      asChild
                      className={`${navigationMenuTriggerStyle()} ${pathname === menu.path ? 'text-indigo-600 dark:text-amber-400 font-semibold bg-indigo-100/50 dark:bg-amber-900/30' : 'text-gray-700 dark:text-amber-300'} hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300`}
                    >
                      <Link href={menu.path}>{menu.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <div className="flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-700 dark:text-amber-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300">
                    <User className="h-4 w-4 text-indigo-600 dark:text-amber-400" />
                    <span className="text-sm font-medium">
                      {username || 'Guest'}
                    </span>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-indigo-600 dark:text-amber-400 hover:text-indigo-700 dark:hover:text-amber-300 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300"
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
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-indigo-600 dark:text-amber-400 hover:text-indigo-700 dark:hover:text-amber-300 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300"
                    onClick={() => handleLogout(router, setUsername)}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-indigo-600 dark:text-amber-400 hover:text-indigo-700 dark:hover:text-amber-300 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-amber-50/80 dark:bg-amber-950/80 backdrop-blur-sm w-72 border-r border-amber-200 dark:border-amber-800/50"
              >
                <div className="flex items-center justify-between mt-5 mb-6">
                  <SheetTitle className="text-xl ml-2 font-bold bg-gradient-to-r from-indigo-500 to-amber-500 dark:from-indigo-600 dark:to-amber-600 bg-clip-text text-transparent">
                    RecipeApp
                  </SheetTitle>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-800 dark:bg-amber-900/50">
                    <User className="h-5 w-5 text-gray-50 dark:text-amber-400" />
                    <span className="text-sm font-medium text-gray-50 dark:text-amber-300">
                      {username || 'Guest'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {menus.map((menu) => (
                      <Button
                        key={menu.title}
                        variant="ghost"
                        className={`w-full justify-start text-base font-medium ${pathname === menu.path ? 'text-indigo-600 dark:text-amber-400 bg-indigo-100/50 dark:bg-amber-900/50' : 'text-gray-700 dark:text-amber-300'} hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300`}
                        onClick={() => setOpen(false)}
                        asChild
                      >
                        <Link href={menu.path}>{menu.title}</Link>
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2 border-t border-amber-200 dark:border-amber-800/50">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-medium text-gray-700 dark:text-amber-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300"
                      onClick={() => {
                        setTheme(theme === "light" ? "dark" : "light")
                        setOpen(false)
                      }}
                    >
                      {theme === "light" ? (
                        <>
                          <Moon className="h-5 w-5 mr-3 text-indigo-600 dark:text-amber-400" />
                          Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="h-5 w-5 mr-3 text-indigo-600 dark:text-amber-400" />
                          Light Mode
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-medium text-gray-700 dark:text-amber-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-100/30 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-300"
                      onClick={() => {
                        handleLogout(router, setUsername)
                        setOpen(false)
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-3 text-indigo-600 dark:text-amber-400" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}