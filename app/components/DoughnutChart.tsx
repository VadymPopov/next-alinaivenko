'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register();

type ServiceData = { service: string; count: number };

export default function DoughnutChart({
  serviceData,
}: {
  serviceData: ServiceData[];
}) {
  const data = {
    labels: serviceData.map((data) => data.service),
    datasets: [
      {
        label: 'Total Appointments',
        data: serviceData.map((data) => data.count),
        backgroundColor: ['#D8F3DC', '#FFD6D9', '#FFE5CC', '#D0EFFF'],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 30,
          boxHeight: 15,
          padding: 10,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
}
