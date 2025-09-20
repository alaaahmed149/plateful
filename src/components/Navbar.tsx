"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Recipes",
    href: "/recipes",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white relative shadow-xs">
      {/* Desktop & Mobile Header */}
      <div className="flex justify-between items-center p-4 h-18">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <Image src="/plateful.png" alt="logo" width={130} height={100} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex px-4 space-x-5 gap-4 items-center text-primary-600 font-semibold">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-primary-700 px-3 py-1 rounded-md cursor-pointer hover:underline-offset-4 hover:underline transition-all duration-200 ease-in-out ${
                pathname === link.href
                  ? "underline underline-offset-4"
                  : "text-primary-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex space-x-4 p-4 items-center">
          <Search className="w-4 h-4 text-primary-600" />
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search a recipe.."
          />
        </div>

        {/* Mobile Menu Button & Search Icon */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleMobileMenu}
            className="text-primary-600 hover:text-primary-700 focus:outline-none focus:text-primary-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg  z-50">
          {/* Mobile Navigation Links */}
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold hover:text-primary-700 hover:bg-background transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary-700 bg-background border-l-4 border-primary-500"
                    : "text-primary-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Search */}
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 mt-3">
              <Search className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search a recipe.."
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
