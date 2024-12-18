import StatCard from '@/app/components/StatCard';
import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';

import { endOfMonth, format, startOfMonth } from 'date-fns';

async function getTotalAppointments() {
  try {
    await connect(); // Ensure your database connection is established
    const totalAppointments = await Appointment.countDocuments();
    return totalAppointments;
  } catch (error) {
    console.error('Error counting documents:', error);
    return 0;
  }
}

async function getTotalIncome() {
  try {
    await connect();
    const totalAppointments = await Appointment.find({});

    const totalIncome = totalAppointments.reduce((total, appt) => {
      const depositAmount = appt.deposit?.amount || 0;
      const paymentAmount = appt.payment?.amount || 0;
      const tipsAmount = appt.payment?.tip || 0;
      return total + depositAmount + paymentAmount + tipsAmount;
    }, 0);

    return totalIncome;
  } catch (error) {
    console.error('Error counting documents:', error);
    return 0;
  }
}

async function getMonthlyAppointments() {
  try {
    await connect();

    const now = new Date();

    const firstDayOfMonth = format(startOfMonth(now), 'yyyy-MM-dd');
    const lastDayOfMonth = format(endOfMonth(now), 'yyyy-MM-dd');

    const appointments = await Appointment.countDocuments({
      date: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    });

    return appointments;
  } catch (error) {
    console.error('Error fetching appointments for this month:', error);
    return 0;
  }
}

async function getMonthlyIncome() {
  try {
    await connect();

    const now = new Date();

    const firstDayOfMonth = format(startOfMonth(now), 'yyyy-MM-dd');
    const lastDayOfMonth = format(endOfMonth(now), 'yyyy-MM-dd');

    const appointments = await Appointment.find({
      date: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    });
    const totalIncome = appointments.reduce((total, appt) => {
      const depositAmount = appt.deposit?.amount || 0;
      const paymentAmount = appt.payment?.amount || 0;
      const tipsAmount = appt.payment?.tip || 0;
      return total + depositAmount + paymentAmount + tipsAmount;
    }, 0);

    return totalIncome;
  } catch (error) {
    console.error('Error fetching appointments for this month:', error);
    return 0;
  }
}

export default async function Page() {
  const total = await getTotalAppointments();
  const monthly = await getMonthlyAppointments();
  const totalIncome = await getTotalIncome();
  const monthlyIncome = await getMonthlyIncome();

  return (
    <div className="grid grid-cols-12 gap-5 mb-4">
      <div className="col-span-3">
        <StatCard label="Total appointments" counter={total} />
      </div>
      <div className="col-span-3">
        <StatCard label="This month appointments" counter={monthly} />
      </div>
      <div className="col-span-3">
        <StatCard
          label="Total income"
          counter={totalIncome}
          isCurrency={true}
        />
      </div>
      <div className="col-span-3">
        <StatCard
          label="This month income"
          counter={monthlyIncome}
          isCurrency={true}
        />
      </div>
    </div>
  );
}
