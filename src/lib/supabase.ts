"use server";
import { createClient } from "@/lib/supabase/server";
import { Team, Player } from "@/lib/types/supabase";

export async function getTeamInfoById(teamId: string) {
  // Create the Supabase client for server-side interaction
  const supabase = await createClient();

  try {
    // Fetch team data
    const { data: teamData } = await supabase
      .from("Teams")
      .select("id, name, club_id")
      .eq("id", teamId)
      .single();

    // Fetch players associated with the team
    const { data: playersData } = await supabase
      .from("Player")
      .select("id, name")
      .eq("team_id", teamId);

    return {
      success: true,
      team: teamData as Team,
      players: playersData as Player[],
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      team: null,
      players: null,
    };
  }
}
