// Mock data
export const orderStatus = [
  { id: 1, item: "Jerseys", quantity: 20, status: "Shipped" },
  { id: 2, item: "Shorts", quantity: 20, status: "Processing" },
  { id: 3, item: "Socks", quantity: 40, status: "Delivered" },
];

export const playerRoster = [
  {
    id: 1,
    name: "John Doe",
    position: "Forward",
    number: 10,
    stats: [
      { subject: "Shooting", A: 120, fullMark: 150 },
      { subject: "Passing", A: 98, fullMark: 150 },
      { subject: "Dribbling", A: 86, fullMark: 150 },
      { subject: "Speed", A: 99, fullMark: 150 },
      { subject: "Stamina", A: 85, fullMark: 150 },
      { subject: "Strength", A: 65, fullMark: 150 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Midfielder",
    number: 8,
    stats: [
      { subject: "Shooting", A: 88, fullMark: 150 },
      { subject: "Passing", A: 130, fullMark: 150 },
      { subject: "Dribbling", A: 110, fullMark: 150 },
      { subject: "Speed", A: 95, fullMark: 150 },
      { subject: "Stamina", A: 105, fullMark: 150 },
      { subject: "Strength", A: 90, fullMark: 150 },
    ],
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Defender",
    number: 4,
    stats: [
      { subject: "Shooting", A: 65, fullMark: 150 },
      { subject: "Passing", A: 110, fullMark: 150 },
      { subject: "Dribbling", A: 80, fullMark: 150 },
      { subject: "Speed", A: 90, fullMark: 150 },
      { subject: "Stamina", A: 100, fullMark: 150 },
      { subject: "Strength", A: 120, fullMark: 150 },
    ],
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Goalkeeper",
    number: 1,
    stats: [
      { subject: "Reflexes", A: 130, fullMark: 150 },
      { subject: "Positioning", A: 115, fullMark: 150 },
      { subject: "Handling", A: 125, fullMark: 150 },
      { subject: "Kicking", A: 100, fullMark: 150 },
      { subject: "Diving", A: 120, fullMark: 150 },
      { subject: "Height", A: 95, fullMark: 150 },
    ],
  },
];

export const performanceData = [
  { name: "Game 1", goals: 2, assists: 1, possession: 60 },
  { name: "Game 2", goals: 1, assists: 2, possession: 55 },
  { name: "Game 3", goals: 3, assists: 0, possession: 65 },
  { name: "Game 4", goals: 0, assists: 3, possession: 58 },
  { name: "Game 5", goals: 2, assists: 1, possession: 62 },
];

export const teamStats = [
  { stat: "Wins", value: 12 },
  { stat: "Losses", value: 4 },
  { stat: "Draws", value: 2 },
  { stat: "Goals For", value: 38 },
  { stat: "Goals Against", value: 22 },
];
