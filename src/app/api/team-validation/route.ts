import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const rateLimitWindow = 60 * 1000;
const maxRequests = 10;
const requestCounts = new Map<string, { count: number; lastRequest: number }>();

export async function POST(req: NextRequest) {
  /* --- CUSTOM IN-MEMORY RATE-LIMITING STORAGE --- */
  const clientIp = req.headers.get("x-forwarded-for") || req.ip;
  const currentTime = Date.now();

  const requestLog = requestCounts.get(clientIp!) || {
    count: 0,
    lastRequest: currentTime,
  };

  if (currentTime - requestLog.lastRequest > rateLimitWindow) {
    requestLog.count = 0;
    requestLog.lastRequest = currentTime;
  }

  requestLog.count += 1;

  if (requestLog.count > maxRequests) {
    return NextResponse.json(
      { success: false, message: "too many requests" },
      { status: 429 },
    );
  }

  requestCounts.set(clientIp!, requestLog);
  /* ---------------------------------------------- */

  /* --- TEAM CODE VALIDATION LOGIC --- */
  const { teamCode } = await req.json();

  // Create the Supabase client for server-side interaction
  const supabase = await createClient();

  // Query the Teams table to check if the team code exists
  const { data, error } = await supabase
    .from("Teams")
    .select("id, name, club_id")
    .eq("access_code", teamCode)
    .single();

  // Handle cases where the team code is not found or an error occurred
  if (error) {
    console.error("Error from Supabase:", error, error.message); // Log the error
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }

  if (!data) {
    console.error("No team found with this code");
    return NextResponse.json(
      { success: false, message: "Invalid team code." },
      { status: 400 },
    );
  }

  // If the team code is valid, store team details here (we'll return it after creating a cookie with team session)
  const response = NextResponse.json({ success: true, team: data });
  /* -------------------------------- */

  /* --- SET COOKIE WITH TEAM SESSION --- */
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // set cookie to expire in one hour

  response.cookies.set("team-session", teamCode, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires,
  });

  return response;
}
