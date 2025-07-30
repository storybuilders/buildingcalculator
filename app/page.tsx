"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<{
    homeSize: number;
    garageSize: number;
    finishLevel: "mid" | "high" | "luxury";
    locationAdjustment: number;
    builderMargin: number;
    permits: number;
    lotCost: number;
    siteWork: number;
  }>({
    homeSize: 2200,
    garageSize: 600,
    finishLevel: "mid",
    locationAdjustment: 0,
    builderMargin: 15,
    permits: 15000,
    lotCost: 200000,
    siteWork: 35000,
  });

  const costTable: Record<"mid" | "high" | "luxury", { living: number; garage: number }> = {
    mid: { living: 170, garage: 65 },
    high: { living: 200, garage: 75 },
    luxury: { living: 240, garage: 90 },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: name === "finishLevel" ? value : parseFloat(value) || 0,
    });
  };

  const baseCosts = costTable[inputs.finishLevel];
  const livingCost = inputs.homeSize * baseCosts.living;
  const garageCost = inputs.garageSize * baseCosts.garage;
  const subtotal = livingCost + garageCost;
  const margin = subtotal * (inputs.builderMargin / 100);
  const adjustedTotal =
    (subtotal + margin + inputs.permits + inputs.siteWork) *
    (1 + inputs.locationAdjustment / 100);
  const totalProjectCost = adjustedTotal + inputs.lotCost;
  const costPerSqFt = totalProjectCost / inputs.homeSize;

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🏗️ Construction Cost Calculator</h1>
      <div className="grid gap-4">
        {[
          { label: "Home Size (sq ft)", name: "homeSize" },
          { label: "Garage Size (sq ft)", name: "garageSize" },
          { label: "Location Adjustment (%)", name: "locationAdjustment" },
          { label: "Builder Margin (%)", name: "builderMargin" },
          { label: "Permits & Fees ($)", name: "permits" },
          { label: "Lot Cost ($)", name: "lotCost" },
          { label: "Site Work ($)", name: "siteWork" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={inputs[field.name as keyof typeof inputs]}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Finish Level</label>
          <select
            name="finishLevel"
            value={inputs.finishLevel}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
          >
            <option value="mid">Mid</option>
            <option value="high">High</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>
      <div className="border-t pt-4 space-y-2">
        <p>
          <strong>Living Area Cost:</strong> ${livingCost.toLocaleString()}
        </p>
        <p>
          <strong>Garage Cost:</strong> ${garageCost.toLocaleString()}
        </p>
        <p>
          <strong>Subtotal Construction:</strong> ${subtotal.toLocaleString()}
        </p>
        <p>
          <strong>Builder Margin:</strong> ${margin.toLocaleString()}
        </p>
        <p>
          <strong>Adjusted Total Build:</strong> ${adjustedTotal.toLocaleString()}
        </p>
        <p>
          <strong>Total Project Cost:</strong> ${totalProjectCost.toLocaleString()}
        </p>
        <p>
          <strong>Cost Per Sq Ft:</strong> ${costPerSqFt.toFixed(2)}
        </p>
      </div>
    </main>
  );
}
