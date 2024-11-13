import { getWooProductById, getWooProductsByTagId } from "@/lib/woocommerce";
import { getTeamInfoById } from "@/lib/supabase";
import { KitInteractiveSection } from "@/components/shop/uniform-kits/kit-interaction";
import { WooCommerceProduct } from "@/lib/types/woocommerce";
import { KitInfo } from "@/lib/types/kit";
import KitSizeChart from "@/components/shop/uniform-kits/kit-size-chart";

export default async function KitPage({
  params,
}: {
  params: { teamId: string };
}) {
  const kit: WooCommerceProduct = await getWooProductById("1276");
  const kitProducts = await getWooProductsByTagId("34");
  const { success, team, players } = await getTeamInfoById(params.teamId);

  if (!success || !team) {
    console.log(success, team);
    return (
      <p>
        Error loading team information. Please check the team code or try again.
      </p>
    );
  }

  const kitInfo: KitInfo = {
    kitName: kit.name,
    kitPrice: kit.price,
    images: kit.images?.map((img) => img.name) || [],
    colors:
      kit.attributes.find((attr) => attr.name.toLowerCase() === "color")
        ?.options || [],
    products: kitProducts,
    teamName: team.name,
    players,
    clubName: "Real Madrid",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white-50 to-gray-300 p-2 md:p-8">
      <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
        <KitInteractiveSection {...kitInfo} />
        <KitSizeChart products={kitProducts} />
      </section>
    </main>
  );
}
