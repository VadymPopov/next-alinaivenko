import DoughnutChart from '@/components/admin/DoughnutChart';
import { getDatabyServiceType } from '@/services/doughnut';

import React, { Suspense, use } from 'react';

export default function Page() {
  const serviceData = use(getDatabyServiceType());

  if (serviceData.every((item) => item.count === 0)) {
    return (
      <div className="text-center">
        <p>No data available for services.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DoughnutChart serviceData={serviceData} />
    </Suspense>
  );
}
