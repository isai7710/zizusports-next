import { KitCartItem, ProductCartItem } from "@/components/cart/cart-context";

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

// Prepare cart items for metadata
export function prepareMetadata(items: (ProductCartItem | KitCartItem)[]) {
  return items
    .map((item, index) => {
      // Handle ProductCartItem
      if ("product" in item) {
        return {
          [`item_${index}_type`]: "product",
          [`item_${index}_name`]: item.product.name,
          [`item_${index}_quantity`]: item.quantity.toString(),
          [`item_${index}_size`]: item.selectedAttributes.size || "N/A",
          [`item_${index}_color`]: item.selectedAttributes.color || "N/A",
        };
        // Handle KitCartItem
      } else {
        return {
          [`item_${index}_type`]: "kit",
          [`item_${index}_name`]: item.name,
          [`item_${index}_quantity`]: item.quantity.toString(),
          [`item_${index}_jersey_size`]: item.jersey.size,
          [`item_${index}_shorts_size`]: item.shorts.size,
          [`item_${index}_socks_size`]: item.socks.size,
          [`item_${index}_color`]: item.globalColor,
          [`item_${index}_player`]: item.player,
          [`item_${index}_team`]: item.team,
        };
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

export function formatOrderDescription(
  items: (ProductCartItem | KitCartItem)[],
) {
  const itemDescriptions = items.map((item) => {
    if ("product" in item) {
      return `${item.quantity}x ${item.product.name}`;
    } else {
      return `${item.quantity}x ${item.name} Kit`;
    }
  });

  // Join items with commas and "and" for the last item
  if (itemDescriptions.length === 0) return "";
  if (itemDescriptions.length === 1) return itemDescriptions[0];

  const lastItem = itemDescriptions.pop();
  return `${itemDescriptions.join(", ")} and ${lastItem}`;
}
