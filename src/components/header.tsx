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
    <header className="fixed left-0 top-0 z-50 w-full bg-zinc-100 bg-opacity-80 backdrop-blur-sm">
      <nav className="flex items-center justify-between h-16 px-4 w-full">
        <div className="flex jusify-start items-center space-x-10">
          <Link
            href="/"
            className={clsx(
              "group flex items-center gap-1 text-center font-semibold text-md bg-transparent md:text-4xl",
              pathname === "/" && "text-zinc-800",
            )}
          >
            <Image src={logo} alt="Sizu Logo" className="w-20 bg-transparent" />
          </Link>
          <ul className="hidden md:flex justify-center space-x-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold px-2 py-2 rounded-md transition-all duration-200",
                    pathname === link.href
                      ? "text-sky-800"
                      : "text-zinc-500 hover:underline hover:underline-offset-8",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <Search
            onClick={() => setSearchIsOpen((prev) => !prev)}
            className="w-5 h-5 text-zinc-800 transition-colors duration-200 hover:text-zinc-400"
          />
          {searchIsOpen && (
            <input
              type="text"
              className="rounded-lg w-52 placeholder-zinc-300 px-2 py-1 text-sm"
              placeholder="Search for a product..."
              autoFocus={searchIsOpen}
            />
          )}
          <ShoppingCart className="w-5 h-5 text-zinc-800" />
          <div className="relative md:hidden ml-4">
            <button
              onClick={() => setShowDropDown(!showDropDown)}
              className="border border-zinc-800 p-1 rounded-md"
              aria-label={!showDropDown ? "Open menu" : "Close menu"}
            >
              {!showDropDown ? (
                <div key="menu">
                  <Menu />
                </div>
              ) : (
                <div key="close">
                  <X />
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
