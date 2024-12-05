import StatCard from '@/app/components/StatCard';

import React from 'react';

export interface SummaryStats {
  appointments: number;
  weekly: number;
  newAppointments: number;
  monthlyIncome: number;
}

const labelByStat: Record<keyof SummaryStats, string> = {
  appointments: 'Total appointments',
  weekly: 'This week appointments',
  newAppointments: 'New appointments',
  monthlyIncome: 'This month income',
};

export default async function Page() {
  return (
    <div className="grid grid-cols-12 gap-5 mb-4">
      {Object.keys(labelByStat).map((key) => (
        <div key={key} className="col-span-3">
          <StatCard label={labelByStat[key]} counter={50} />
        </div>
      ))}
    </div>
  );
}
