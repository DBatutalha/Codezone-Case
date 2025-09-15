"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import SearchInput from "@/components/ui/SearchInput";

const links = [
  {
    name: "HABERLER",
    href: "/blog",
  },
  {
    name: "ETKİNLİKLER",
    href: "/",
  },
  {
    name: "MÜZİKLER",
    href: "/",
  },
  {
    name: "VİDEOLAR",
    href: "/",
  },
  {
    name: "İLETİŞİM",
    href: "/",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC tuşu ile search'i kapat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isSearchOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-20 border-b border-b-[#2a2a3a] transition-colors duration-300 bg-[#1212121A] backdrop-blur-[24px]`}
    >
      <Container
        size="main"
        className="flex items-center justify-between h-full"
      >
        <div className="flex items-center gap-8 xl:gap-32">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/Images/navbar.svg"
              alt="logo"
              width={235}
              height={59}
              className="max-[428px]:w-[150px] max-[428px]:h-[38px]"
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-6 text-white">
            {links.map((link) => (
              <Link
                key={link.name}
                className="cursor-pointer font-saira-normal text-[1vw] hover:text-gray-300 transition-colors"
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search Icon - Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:opacity-70 transition-opacity duration-300"
            aria-label="Toggle search"
          >
            <Image
              src="/vectors/Vector.svg"
              alt="search icon"
              width={23}
              height={22}
            />
          </button>

          {/* Search Input - Conditional */}
          {isSearchOpen && (
            <div className="w-64 animate-in slide-in-from-right duration-300">
              <SearchInput
                placeholder="Blog ara..."
                size="small"
                className="w-full"
                autoFocus={true}
              />
            </div>
          )}

          <button className="w-30 h-10 bg-white text-black font-saira-bold text-sm md:text-base hover:bg-gray-100 transition-colors">
            Giriş Yap
          </button>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:opacity-70 transition-opacity duration-300"
            aria-label="Toggle search"
          >
            <Image
              src="/vectors/Vector.svg"
              alt="search icon"
              width={23}
              height={22}
            />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1 max-[428px]:w-6 max-[428px]:h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 max-[428px]:w-4 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 max-[428px]:w-4 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 max-[428px]:w-4 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </Container>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#121212] border-b border-b-[#2a2a3a] backdrop-blur-[24px] animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4">
            <SearchInput
              placeholder="Blog ara..."
              size="medium"
              className="w-full"
              autoFocus={true}
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#121212] border-b border-b-[#2a2a3a] backdrop-blur-[24px] animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                className="block text-white font-saira-normal text-lg hover:text-gray-300 transition-colors py-2"
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              <button className="bg-white text-black font-saira-bold text-sm px-6 py-2 hover:bg-gray-100 transition-colors">
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
