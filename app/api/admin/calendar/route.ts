import Availability from '@/db/models/Calendar';
import connect from '@/db/mongodb';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const isExists = searchParams.get('isExists');

    if (!month || !year) {
      return new NextResponse('Month and Year are required', { status: 400 });
    }

    if (isExists === 'true') {
      const exists = await Availability.exists({ month, year });
      return NextResponse.json({ exists: !!exists }, { status: 200 });
    } else {
      const availability = await Availability.findOne({ month, year });

      if (!availability) {
        return NextResponse.json([], { status: 200 });
      }

      return NextResponse.json(availability.blockedDates, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error handling request:', errorMessage);
    return new NextResponse(`Error: ${errorMessage}`, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newAvailability = new Availability(body);
    await newAvailability.save();

    return NextResponse.json(
      { message: 'Choosen dates has been blocked', newAvailability },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error blocking choosen dates:', errorMessage);
    return new NextResponse(`Error blocking choosen dates: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const body = await request.json();

  try {
    await connect();
    const availability = await Availability.findOne({ month, year });
    if (!availability) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    const updatedAvailability = await Availability.findOneAndUpdate(
      { month, year },
      body,
      {
        new: true,
      },
    );

    return NextResponse.json(
      {
        message: 'Availability has been updated successfully',
        updatedAvailability,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating availability:', errorMessage);
    return new NextResponse(`Error updating  availability: ${errorMessage}`, {
      status: 500,
    });
  }
};
