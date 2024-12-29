import DoughnutChart from '@/app/components/DoughnutChart';
import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';

const serviceTypes = [
  'Small Tattoo',
  'Large Tattoo',
  'Permanent Makeup',
  'Touch-up',
];

async function getDatabyServiceType() {
  try {
    await connect();

    const results = await Appointment.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $project: { _id: 0, service: '$_id', count: 1 } },
    ]);

    const response = serviceTypes.map((type) => {
      const found = results.find((item) => item.service === type);
      return { service: type, count: found ? found.count : 0 };
    });

    return response;
  } catch (error) {
    console.error('Error counting documents:', error);
    return serviceTypes.map((type) => ({ service: type, count: 0 }));
  }
}

export default async function Page() {
  const serviceData = await getDatabyServiceType();

  if (serviceData.every((item) => item.count === 0)) {
    return (
      <div className="text-center">
        <p>No data available for services.</p>
      </div>
    );
  }

  return <DoughnutChart serviceData={serviceData} />;
}
