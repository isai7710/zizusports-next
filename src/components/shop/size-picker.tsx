"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { jerseySizes } from "@/lib/sizes";

export function SizePicker({
  sizes,
  productName,
}: {
  sizes: string[];
  productName: string;
}) {
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-medium text-gray-900">Select a size</h2>
        <Dialog>
          <DialogTrigger>
            <p className="text-sm font-medium text-gray-400 hover:text-slate-500">
              See sizing chart
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Sizing Chart</DialogTitle>
              <DialogDescription>{productName}</DialogDescription>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]"></TableHead>
                  {jerseySizes.map((size, index) => (
                    <TableHead key={index} className="font-medium">
                      {size.size}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableHead className="">Chest</TableHead>
                  {jerseySizes.map((size, index) => (
                    <TableCell key={index} className="font-medium">
                      {size.chest}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableHead className="">Torso</TableHead>
                  {jerseySizes.map((size, index) => (
                    <TableCell key={index} className="font-medium">
                      {size.torso}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={cn(
          "grid gap-3",
          sizes.length > 4 ? "grid-cols-4" : `grid-cols-${sizes.length}`,
        )}
      >
        {sizes.map((size, index) => (
          <span
            key={index}
            onClick={() => setSelectedSize(sizes[index])}
            className={cn(
              size === selectedSize
                ? "border-transparent bg-primary text-white hover:bg-opacity-80 transition duration-100 ease-in-out"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-100 transition duration-100 ease-in-out",
              "flex items-center justify-center rounded-md border py-1 text-sm font-medium uppercase hover:cursor-pointer px-3",
            )}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}
