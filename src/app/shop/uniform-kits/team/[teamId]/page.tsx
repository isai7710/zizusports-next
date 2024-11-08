import { getWooProductById, getWooProductsByTagId } from "@/lib/woocommerce";
import { getTeamInfoById } from "@/lib/supabase";
import { KitInteractiveSection } from "@/components/shop/uniform-kits/kit-interaction";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export default async function KitPage({
  params,
}: {
  params: { teamId: string };
}) {
  const kitInfo: WooCommerceProduct = await getWooProductById("1276");
  const kitName = kitInfo.name;
  const kitPrice = kitInfo.price;
  const kitImages = kitInfo.images?.map((img) => img.name);
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-white-50 to-gray-300 p-8">
      <KitInteractiveSection
        kitName={kitName}
        kitPrice={kitPrice}
        images={kitImages}
        products={kitProducts}
        teamName={team.name}
        players={players}
        clubName={"Real Madrid"}
      />

      {kitInfo.short_description && (
        <div className="mt-4 md:mt-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{kitInfo.short_description.replace(/<\/?p>/g, "")}</p>
        </div>
      )}
    </main>
  );
}
