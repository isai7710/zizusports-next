export interface Player {
  id: string;
  name: string;
  email?: string;
  team_id: string;
  order_status: "PENDING" | "COMPLETE" | "NONE";
}

export interface Team {
  id: string;
  name: string;
  access_code: string;
  club_id: string;
}

interface TeamInfoResponse {
  success: boolean;
  team: Team | null;
  players: Player[] | null;
}
