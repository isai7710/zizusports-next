import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface LinkType {
  name: string;
  href: string;
}

interface DropdownMenuProps {
  links: LinkType[];
  setIsOpen: (isOpen: boolean) => void;
}
export default function DropdownMenu({ links, setIsOpen }: DropdownMenuProps) {
  const pathname = usePathname();

  return (
    <div className="absolute right-0 mt-4 w-48 backdrop-blur-sm rounded-md shadow-lg py-1">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={clsx(
            "block font-medium px-4 py-2 text-zinc-800",
            pathname === link.href
              ? "text-zinc-800 bg-zinc-200 bg-opacity-10 underline underline-offset-2"
              : "text-zinc-500 hover:underline hover:bg-zinc-500 hover:bg-opacity-10 hover:underline-offset-2 hover:shadow-inner",
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
