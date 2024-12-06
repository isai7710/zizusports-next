import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

interface DropdownMenuProps {
  links: NavLink[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownMenu({
  links,
  isOpen,
  setIsOpen,
}: DropdownMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -16 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 top-16 bg-white shadow-lg z-50"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.2 }}
        >
          <nav className="container mx-auto py-4">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.subItems ? (
                    <div>
                      <button
                        onClick={() => handleSubmenuToggle(link.name)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openSubmenu === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {link.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
