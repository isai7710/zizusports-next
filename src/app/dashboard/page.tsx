"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Users, Activity, Shirt } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Mock data
const orderStatus = [
  { id: 1, item: "Jerseys", quantity: 20, status: "Shipped" },
  { id: 2, item: "Shorts", quantity: 20, status: "Processing" },
  { id: 3, item: "Socks", quantity: 40, status: "Delivered" },
];

const playerRoster = [
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

const performanceData = [
  { name: "Game 1", goals: 2, assists: 1, possession: 60 },
  { name: "Game 2", goals: 1, assists: 2, possession: 55 },
  { name: "Game 3", goals: 3, assists: 0, possession: 65 },
  { name: "Game 4", goals: 0, assists: 3, possession: 58 },
  { name: "Game 5", goals: 2, assists: 1, possession: 62 },
];

const teamStats = [
  { stat: "Wins", value: 12 },
  { stat: "Losses", value: 4 },
  { stat: "Draws", value: 2 },
  { stat: "Goals For", value: 38 },
  { stat: "Goals Against", value: 22 },
];

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-left text-3xl mb-2 font-bold">Mock Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Statistics */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Activity className="mr-2" /> Team Statistics
            </CardTitle>
            <CardDescription>Season overview and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stat" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    goals: {
                      label: "Goals",
                      color: "hsl(var(--chart-1))",
                    },
                    assists: {
                      label: "Assists",
                      color: "hsl(var(--chart-2))",
                    },
                    possession: {
                      label: "Possession %",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="goals"
                        stroke="var(--color-goals)"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="assists"
                        stroke="var(--color-assists)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="possession"
                        stroke="var(--color-possession)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <ShoppingCart className="mr-2" /> Order Status
            </CardTitle>
            <CardDescription>Latest uniform orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderStatus.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.item}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Player Roster */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Users className="mr-2" /> Player Roster
            </CardTitle>
            <CardDescription>
              Current team lineup (hover for stats)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playerRoster.map((player) => (
                  <HoverCard key={player.id} openDelay={100}>
                    <HoverCardTrigger asChild>
                      <TableRow className="cursor-pointer">
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.number}</TableCell>
                      </TableRow>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80" side="right">
                      <div className="flex justify-between space-x-4">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {player.name}
                          </h3>
                          <p className="text-sm">
                            {player.position} - #{player.number}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={player.stats}
                          >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar
                              name={player.name}
                              dataKey="A"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.6}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Uniform Customization */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Shirt className="mr-2" /> Uniform Customization
            </CardTitle>
            <CardDescription>Customize team uniforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="jersey-color">Jersey Color</Label>
                <Select>
                  <SelectTrigger id="jersey-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shorts-color">Shorts Color</Label>
                <Select>
                  <SelectTrigger id="shorts-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="navy">Navy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="socks-color">Socks Color</Label>
                <Select>
                  <SelectTrigger id="socks-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="team">Team Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="custom-text">Custom Text</Label>
              <Input
                id="custom-text"
                placeholder="Enter custom text for jerseys"
              />
            </div>
            <Button className="mt-4 text-white">Save Customization</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
