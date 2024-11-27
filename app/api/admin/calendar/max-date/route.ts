import connect from '@/app/lib/db';
import Setting from '@/app/lib/models/setting';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();
    const setting = await Setting.findOne();

    if (!setting) {
      return NextResponse.json({ date: '' }, { status: 200 });
    }

    return NextResponse.json(setting, { status: 200 });
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

    const newDate = new Setting(body);
    await newDate.save();

    return NextResponse.json(
      { message: 'New date has been set', newDate },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error setting new date:', errorMessage);
    return new NextResponse(`Error setting new date: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const body = await request.json();

  try {
    await connect();
    const availability = await Setting.findById(id);
    if (!availability) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    const updatedAvailability = await Setting.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(
      {
        message: 'New max date has been updated successfully',
        updatedAvailability,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating max date:', errorMessage);
    return new NextResponse(`Error updating  max date: ${errorMessage}`, {
      status: 500,
    });
  }
};
