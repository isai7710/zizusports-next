"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function UniformKits() {
  const [teamCode, setTeamCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/team-validation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamCode }),
      });

      const result = await response.json();

      if (result.success) {
        // Team code is valid; you can redirect or show customization options here
        console.log("Team found:", result.team);
      } else {
        // Handle invalid code (e.g., show an error message)
        console.log(result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-8">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Uniform Kits
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your team code to customize your uniform kit order
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="teamCode"
              className="block text-sm font-medium text-gray-700"
            >
              Team Code
            </label>
            <div className="mt-1">
              <Input
                id="teamCode"
                name="teamCode"
                type="text"
                required
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Enter your team code..."
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full flex justify-between items-center text-palette-3"
          >
            Access Uniform Kit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have a team code?{" "}
        <a href="#" className="font-medium text-primary hover:text-primary/80">
          Contact your team administrator
        </a>
      </p>
    </div>
  );
}
