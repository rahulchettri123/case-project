import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// Mock categories data - in a real app, this would come from a database
const categories = [
  {
    id: "furniture",
    name: "Furniture",
    subcategories: [
      { id: "chairs", name: "Chairs" },
      { id: "tables", name: "Tables" },
      { id: "sofas", name: "Sofas" },
      { id: "beds", name: "Beds" },
    ],
  },
  {
    id: "decor",
    name: "Decor",
    subcategories: [
      { id: "wall-art", name: "Wall Art" },
      { id: "vases", name: "Vases" },
      { id: "candles", name: "Candles" },
      { id: "mirrors", name: "Mirrors" },
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    subcategories: [
      { id: "floor-lamps", name: "Floor Lamps" },
      { id: "table-lamps", name: "Table Lamps" },
      { id: "ceiling-lights", name: "Ceiling Lights" },
      { id: "wall-lights", name: "Wall Lights" },
    ],
  },
  {
    id: "textiles",
    name: "Textiles",
    subcategories: [
      { id: "rugs", name: "Rugs" },
      { id: "cushions", name: "Cushions" },
      { id: "throws", name: "Throws" },
      { id: "curtains", name: "Curtains" },
    ],
  },
];

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl">H</div>
            <span className="text-xl font-bold">HomeCraft</span>
          </Link>

          {/* Search Bar - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/signin" className="w-full">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/signup" className="w-full">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders" className="w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">Wishlist</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-8 py-3">
          {categories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger className="font-medium hover:text-primary">
                {category.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>
                  <Link href={`/categories/${category.id}`}>
                    All {category.name}
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {category.subcategories.map((subcategory) => (
                  <DropdownMenuItem key={subcategory.id}>
                    <Link href={`/categories/${category.id}/${subcategory.id}`} className="w-full">
                      {subcategory.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Link href="/deals" className="font-medium hover:text-primary">
            Special Deals
          </Link>
          <Link href="/new-arrivals" className="font-medium hover:text-primary">
            New Arrivals
          </Link>
        </nav>

        {/* Mobile Search - Only visible on mobile */}
        <div className="py-3 lg:hidden">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 