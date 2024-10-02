"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Home } from "react-feather";
import { useState } from "react";
import clsx from "clsx";
import DropdownMenu from "@/components/dropdown-menu";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-400 bg-opacity-25 border-zinc-100 border shadow-xl backdrop-blur-sm transition-all duration-200">
      <nav className="flex items-center h-16 px-4 max-w-7xl mx-auto">
        <div className="flex-1 flex jusify-start items-center">
          <Link
            href="/"
            className={clsx(
              "group flex items-center gap-1 text-center font-semibold text-md bg-transparent md:text-xl",
              pathname === "/" && "text-zinc-800",
            )}
          >
            <Home className="w-6 h-6 group-hover:rotate-[20deg] transition ease-in-out duration-300" />
            ZizuSports
          </Link>
        </div>

        <ul className="hidden md:flex flex-1 items-center justify-center space-x-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "text-md font-semibold px-3 py-2 rounded-md transition-all duration-200",
                  pathname === link.href
                    ? "text-sky-800 bg-zinc-200 bg-opacity-10 underline underline-offset-4"
                    : "text-zinc-500 hover:underline hover:bg-zinc-700 hover:bg-opacity-10 hover:underline-offset-2 hover:shadow-xl",
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex-1 flex justify-end items-center gap-1">
          <Search className="w-6 h-6 text-zinc-800 transition-colors duration-200 hover:text-zinc-400" />
          <input
            type="text"
            className="rounded-lg w-52 placeholder-zinc-300 px-2 py-1 text-sm"
            placeholder="Search for a product..."
          />
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
