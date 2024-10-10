"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart } from "react-feather";
import { useState } from "react";
import logo from "../../public/sizulogo.png";
import clsx from "clsx";
import DropdownMenu from "@/components/dropdown-menu";

const links = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "SHOP",
    href: "/shop",
  },
  {
    name: "CONTACT US",
    href: "/contact",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-sm">
      <nav className="flex items-center justify-between h-16 px-4 w-full">
        <Link href="/" className="flex jusify-start items-center space-x-10">
          <Image src={logo} alt="Sizu Logo" className="w-20 bg-transparent" />
        </Link>
        <ul className="hidden md:flex flex-1 justify-center space-x-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "text-sm font-semibold px-2 py-2 rounded-md transition-all duration-200",
                  pathname === link.href
                    ? "text-primary underline underline-offset-8"
                    : "text-zinc-400 hover:underline hover:underline-offset-8",
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Search
            onClick={() => setSearchIsOpen((prev) => !prev)}
            className="w-8 text-primary transition-colors duration-200 hover:text-zinc-400"
          />
          {searchIsOpen && (
            <input
              type="text"
              className="rounded-lg w-52 placeholder-zinc-300 px-2 py-1 text-sm"
              placeholder="Search for a product..."
              autoFocus={searchIsOpen}
            />
          )}
          <ShoppingCart className="w-8 text-primary" />
          <div className="relative md:hidden">
            <button
              onClick={() => setShowDropDown(!showDropDown)}
              className="p-1 rounded-md"
              aria-label={!showDropDown ? "Open menu" : "Close menu"}
            >
              {!showDropDown ? (
                <div key="menu">
                  <Menu className="w-8" />
                </div>
              ) : (
                <div key="close">
                  <X className="w-8" />
                </div>
              )}
            </button>
            {showDropDown && (
              <DropdownMenu links={links} setIsOpen={setShowDropDown} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
