import { MaxDate, connect } from '@/db';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();
    const maxDate = await MaxDate.findOne();

    if (!maxDate) {
      return NextResponse.json(
        { message: 'No max date found', date: null },
        { status: 200 },
      );
    }

    return NextResponse.json(maxDate, { status: 200 });
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

    if (!body.date) {
      return NextResponse.json(
        { error: 'Date field is required' },
        { status: 400 },
      );
    }

    await connect();

    const newDate = new MaxDate(body);
    await newDate.save();

    return NextResponse.json(
      { message: 'New date has been set', newDate },
      { status: 201 },
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
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id || !body.date) {
      return NextResponse.json(
        { error: 'ID and Date fields are required' },
        { status: 400 },
      );
    }

    await connect();

    const updatedMaxDate = await MaxDate.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedMaxDate) {
      return new NextResponse('Max date not found', { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'New max date has been updated successfully',
        updatedMaxDate,
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
