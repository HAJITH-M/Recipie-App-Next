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
    { title: "Categories", path: "/categories" },
    { title: "Favorites", path: "/dashboard/favorites" },
  ]

  return (
    <nav className="bg-background w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src="https://ik.imagekit.io/k5gvskw6y/image.png"
                  alt="Recipe App Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-primary">RecipeApp</h1>
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
                      className={`${navigationMenuTriggerStyle()} ${pathname === menu.path ? 'text-[#8B0000] font-semibold' : 'text-[#00008B]'} hover:text-[#8B0000]`}
                    >
                      <Link href={menu.path}>{menu.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <div className="flex items-center gap-2 px-4 py-2 cursor-pointer text-[#00008B]">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {username || 'Guest'}
                    </span>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-[#00008B] hover:text-[#8B0000]"
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
                  <Button variant="ghost" size="icon" className="cursor-pointer text-[#00008B] hover:text-[#8B0000]" onClick={() => handleLogout(router, setUsername)}>
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
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="text-left">Navigation Menu</SheetTitle>
                <div className="flex flex-col items-start gap-4 pt-4">
                  <div className="flex items-center gap-2 py-2 px-1">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {username || 'Guest'}
                    </span>
                  </div>
                  {menus.map((menu) => (
                    <Button
                      key={menu.title}
                      variant="link"
                      className={`text-base ${pathname === menu.path ? 'text-[#8B0000] font-semibold' : 'text-[#00008B]'}`}
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href={menu.path}>{menu.title}</Link>
                    </Button>
                  ))}
                  <Button
                    variant="link"
                    className="text-base text-[#00008B]"
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
                  <Button
                    variant="link"
                    className="text-base text-[#00008B]"
                    onClick={() => {
                      handleLogout(router, setUsername);
                      setOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
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