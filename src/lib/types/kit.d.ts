import { WooCommerceProduct } from "./woocommerce";
import { Player } from "@/lib/types/supabase";

export interface KitInfo {
  kitName: string;
  kitPrice: string;
  images: string[];
  colors: string[];
  products: WooCommerceProduct[];
  teamName: string;
  players: Player[];
  clubName: string;
}
