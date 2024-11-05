import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { teamCode } = await req.json();

  // Create the Supabase client for server-side interaction
  const supabase = await createClient();

  // Query the Teams table to check if the team code exists
  const { data, error } = await supabase
    .from("Teams")
    .select("id, name, clubId")
    .eq("accessCode", teamCode)
    .single();

  // Handle cases where the team code is not found or an error occurred
  if (error || !data) {
    return NextResponse.json(
      { success: false, message: "Invalid team code." },
      { status: 400 },
    );
  }

  // If the team code is valid, return team details
  return NextResponse.json({ success: true, team: data });
}
