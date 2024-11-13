import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sizes } from "@/lib/sizes";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

interface KitSizeChartProps {
  products: WooCommerceProduct[];
}

export default function KitSizeChart({ products }: KitSizeChartProps) {
  return (
    <div id="size-chart" className="grid grid-cols-2 space-x-2">
      {products.map((product, index) => {
        // Identify the main category of the product
        const categoryName = product.categories[0]?.name.toLowerCase();
        const categorySizes = sizes[categoryName as keyof typeof sizes];

        // If there's no matching size chart data for this category, skip
        if (!categorySizes) {
          return <p key={index}>No size chart available for {product.name}</p>;
        }

        // Extract the keys dynamically for table rows
        const sizeKeys = Object.keys(categorySizes);

        return (
          <div
            key={index}
            className="my-4 border border-gray-200 rounded-md p-2"
          >
            <h3 className="text-lg font-semibold">
              Size Chart for {product.name}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="w-[90px] font-medium">
                    Size (cm)
                  </TableCell>
                  {categorySizes.size.map((size, idx) => (
                    <TableHead key={idx} className="font-medium">
                      {size}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Dynamically create rows for each attribute (chest, waist, etc.) */}
                {sizeKeys.slice(1).map((key) => (
                  <TableRow key={key}>
                    <TableHead className="capitalize font-medium">
                      {key}
                    </TableHead>
                    {categorySizes[key as keyof typeof categorySizes]?.map(
                      (value, idx) => (
                        <TableCell key={idx} className="font-medium">
                          {value}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}
