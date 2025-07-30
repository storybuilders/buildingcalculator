'use client';

import { useState } from 'react';

export default function Home() {
  const [inputs, setInputs] = useState({
    homeSize: 0,
    pricePerSqFt: 0,
    permitFees: 0,
    utilityHookups: 0,
    landscaping: 0,
    designFees: 0,
    contingency: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const totalProjectCost =
    inputs.homeSize * inputs.pricePerSqFt +
    inputs.permitFees +
    inputs.utilityHookups +
    inputs.landscaping +
    inputs.designFees +
    inputs.contingency;

  const costPerSqFt = totalProjectCost / inputs.homeSize || 0;

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🏗️ Construction Cost Calculator</h1>
      <div className="grid gap-4">
        {[
          { label: 'Home Size (sq ft)', name: 'homeSize' },
          { label: 'Price per Sq Ft ($)', name: 'pricePerSqFt' },
          { label: 'Permit Fees ($)', name: 'permitFees' },
          { label: 'Utility Hookups ($)', name: 'utilityHookups' },
          { label: 'Landscaping ($)', name: 'landscaping' },
          { label: 'Design Fees ($)', name: 'designFees' },
          { label: 'Contingency ($)', name: 'contingency' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={inputs[field.name as keyof typeof inputs]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div>
          <strong>Total Project Cost:</strong> ${totalProjectCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
        <div>
          <strong>Estimated Cost per Sq Ft:</strong> ${costPerSqFt.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>
    </main>
  );
}
