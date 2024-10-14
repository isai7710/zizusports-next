"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sizes } from "@/lib/sizes";

type CategorySizes = {
  size: string[];
  chest?: number[];
  torso?: number[];
  waist?: number[];
  length?: number[];
};

const defaultCategorySizes: CategorySizes = { size: [] };

export function SizePicker({
  sizeLabels,
  productName,
  productCategory,
}: {
  sizeLabels: string[];
  productName: string;
  productCategory: string;
}) {
  const [selectedSize, setSelectedSize] = useState(sizeLabels[2]);
  const categorySizes: CategorySizes =
    sizes[productCategory as keyof typeof sizes] || defaultCategorySizes;

  const sizeKeys = Object.keys(categorySizes);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-medium text-gray-900">Select a size</h2>
        <Dialog>
          {categorySizes.size.length > 0 ? (
            <DialogTrigger>
              <p className="text-sm font-medium text-gray-400 hover:text-slate-500">
                See sizing chart
              </p>
            </DialogTrigger>
          ) : (
            <p className="text-sm font-medium text-gray-400 cursor-not-allowed">
              Sizing chart not available
            </p>
          )}
          {categorySizes.size.length > 0 && (
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Sizing Chart</DialogTitle>
                <DialogDescription>{productName}</DialogDescription>
              </DialogHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="w-[90px] font-medium">
                      Size (cm)
                    </TableCell>
                    {categorySizes.size.map((size, index) => (
                      <TableHead key={index} className="font-medium">
                        {size}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeKeys.slice(1).map((key) => (
                    <TableRow key={key}>
                      <TableHead className="">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableHead>
                      {key in categorySizes &&
                        categorySizes[key as keyof CategorySizes]?.map(
                          (value, index) => (
                            <TableCell key={index} className="font-medium">
                              {value}
                            </TableCell>
                          ),
                        )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div
        className={cn(
          "grid gap-3",
          sizeLabels.length > 4
            ? "grid-cols-4"
            : `grid-cols-${sizeLabels.length}`,
        )}
      >
        {sizeLabels.map((size, index) => (
          <span
            key={index}
            onClick={() => setSelectedSize(sizeLabels[index])}
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
