import { Availability, connect } from '@/db';
import { findNextAvailableDate } from '@/utils';

import { addDays, addMonths } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

async function getSlots(date: string, duration: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/slots?date=${date}&duration=${duration}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
}

async function getAvailableDateWithSlots(
  date: Date,
  blockedDates: string[],
  duration: string,
) {
  const parsedDate = date.toISOString().split('T')[0];
  const slots = await getSlots(parsedDate, duration);

  if (slots.length > 0) {
    return { date: parsedDate, slots, blockedDates };
  } else {
    const nextDate = findNextAvailableDate({
      date: addDays(date, 1),
      blockedDates,
    });

    if (!nextDate) {
      return null;
    }

    return await getAvailableDateWithSlots(nextDate, blockedDates, duration);
  }
}

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const duration = searchParams.get('duration') || '60';

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextMonthDate = addMonths(currentDate, 1);
    const nextYear = nextMonthDate.getFullYear();
    const availabilities = await Availability.find({
      $or: [{ year: currentYear }, { year: nextYear }],
    });

    const combinedAvailability = availabilities.flatMap(
      (availability) => availability?.blockedDates || [],
    );

    const firstAvailableDate = findNextAvailableDate({
      date: currentDate,
      blockedDates: combinedAvailability,
    });

    if (!firstAvailableDate) {
      return new NextResponse('No available dates found.', { status: 404 });
    }

    const availableDate = await getAvailableDateWithSlots(
      firstAvailableDate,
      combinedAvailability,
      duration,
    );

    return NextResponse.json(availableDate, {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error handling request:', errorMessage);
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
};
