import { StatCard } from '@/components/admin';
import {
  getMonthlyAppointments,
  getMonthlyIncome,
  getTotalAppointments,
  getTotalIncome,
} from '@/services';

import React, { Suspense, use } from 'react';

import { format } from 'date-fns';

export default function Page() {
  const total = use(getTotalAppointments());
  const monthly = use(getMonthlyAppointments());
  const totalIncome = use(getTotalIncome());
  const monthlyIncome = use(getMonthlyIncome());

  const currentMonth = format(new Date(), 'MMMM');

  return (
    <div className="grid grid-cols-2 xl:grid-cols-12 xl:gap-5 gap-5 justify-center items-center">
      <div className="col-span-1 sm:col-span-3">
        <Suspense fallback={<p>Loading...</p>}>
          <StatCard label="Total appointments" counter={total} />
        </Suspense>
      </div>
      <div className="col-span-1 sm:col-span-3">
        <Suspense fallback={<p>Loading...</p>}>
          <StatCard label={`${currentMonth} appointments`} counter={monthly} />
        </Suspense>
      </div>
      <div className="col-span-1 sm:col-span-3">
        <Suspense fallback={<p>Loading...</p>}>
          <StatCard
            label="Total income"
            counter={totalIncome}
            isCurrency={true}
          />
        </Suspense>
      </div>
      <div className="col-span-1 sm:col-span-3">
        <Suspense fallback={<p>Loading...</p>}>
          <StatCard
            label={`${currentMonth} income`}
            counter={monthlyIncome}
            isCurrency={true}
          />
        </Suspense>
      </div>
    </div>
  );
}
