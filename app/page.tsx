"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState({
    homeSize: 0,
    costPerSqFt: 0,
    lotCost: 0,
    permitsAndFees: 0,
    designFees: 0,
    contingency: 0,
    otherCosts: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const totalProjectCost =
    inputs.homeSize * inputs.costPerSqFt +
    inputs.lotCost +
    inputs.permitsAndFees +
    inputs.designFees +
    inputs.contingency +
    inputs.otherCosts;

  const costPerSqFt = inputs.homeSize
    ? totalProjectCost / inputs.homeSize
    : 0;

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🏗️ Construction Cost Calculator</h1>
      <div className="grid gap-4">
        {[
          ["homeSize", "Home Size (sq ft)"],
          ["costPerSqFt", "Build Cost per Sq Ft"],
          ["lotCost", "Lot Cost"],
          ["permitsAndFees", "Permits & Fees"],
          ["designFees", "Design Fees"],
          ["contingency", "Contingency"],
          ["otherCosts", "Other Costs"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block font-medium">{label}</label>
            <input
              type="number"
              name={key}
              value={inputs[key as keyof typeof inputs] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100 rounded">
        <p>Total Project Cost: ${totalProjectCost.toLocaleString()}</p>
        <p>Cost per Sq Ft: ${costPerSqFt.toFixed(2)}</p>
      </div>
    </main>
  );
}
