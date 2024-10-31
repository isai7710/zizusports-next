"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bell, ShoppingCart, Users, Activity, Shirt } from "lucide-react";
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

// Mock data
const orderStatus = [
  { id: 1, item: "Jerseys", quantity: 20, status: "Shipped" },
  { id: 2, item: "Shorts", quantity: 20, status: "Processing" },
  { id: 3, item: "Socks", quantity: 40, status: "Delivered" },
];

const playerRoster = [
  { id: 1, name: "John Doe", position: "Forward", number: 10 },
  { id: 2, name: "Jane Smith", position: "Midfielder", number: 8 },
  { id: 3, name: "Mike Johnson", position: "Defender", number: 4 },
  { id: 4, name: "Sarah Williams", position: "Goalkeeper", number: 1 },
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
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 italic">
            Mock Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
              <CardDescription>Current team lineup</CardDescription>
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
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.number}</TableCell>
                    </TableRow>
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
              <Button className="mt-4">Save Customization</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
