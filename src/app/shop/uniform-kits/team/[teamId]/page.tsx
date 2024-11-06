import { getWooProductById, getWooProductsByTagId } from "@/lib/woocommerce";
import { getTeamInfoById } from "@/lib/supabase";
import { KitInteractiveSection } from "@/components/shop/uniform-kits/kit-interaction";

export default async function KitPage({
  params,
}: {
  params: { teamId: string };
}) {
  const kit = await getWooProductById("1276");
  const kitImages = kit.images?.length ? kit.images : [];
  const products = await getWooProductsByTagId("34");

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
        kit={kit}
        images={kitImages}
        products={products}
        teamName={team.name}
        players={players}
        clubName={"Real Madrid"}
      />

      {kit.short_description && (
        <div className="mt-4 md:mt-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{kit.short_description.replace(/<\/?p>/g, "")}</p>
        </div>
      )}
    </main>
  );
}
