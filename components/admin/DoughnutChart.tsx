'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register();

interface ServiceData {
  service: string;
  count: number;
}

export function DoughnutChart({ serviceData }: { serviceData: ServiceData[] }) {
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
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex sm:flex-col flex-row-reverse items-center lg:items-start gap-2 lg:gap-5">
      <div className="h-40 w-40 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[400px] xl:w-[400px]">
        <Doughnut data={data} options={options} />
      </div>

      <div className="flex flex-col gap-2 text-xs sm:text-sm lg:text-base">
        {serviceData.map((data, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-2 h-2 md:w-4 md:h-4 inline-block rounded-full"
              style={{
                backgroundColor: ['#D8F3DC', '#FFD6D9', '#FFE5CC', '#D0EFFF'][
                  index
                ],
              }}
            ></span>
            <span>{data.service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
