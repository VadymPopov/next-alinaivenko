import { Appointment, connect } from '@/db';

import { endOfMonth, format, startOfMonth } from 'date-fns';

export async function getTotalAppointments() {
  try {
    await connect();
    const totalAppointments = await Appointment.countDocuments();
    return totalAppointments;
  } catch (error) {
    console.error('Error counting documents:', error);
    return 0;
  }
}

export async function getTotalIncome() {
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

export async function getMonthlyAppointments() {
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

export async function getMonthlyIncome() {
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
