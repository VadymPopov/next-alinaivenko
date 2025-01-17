import Studio from '@/db/models/Studio';
import connect from '@/db/mongodb';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();
    const studio = await Studio.findOne();

    if (!studio) {
      return NextResponse.json(
        { address: '', city: '', name: '', longitude: '', latitude: '' },
        { status: 200 },
      );
    }

    return NextResponse.json(studio, { status: 200 });
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

    const newAddress = new Studio(body);
    await newAddress.save();

    return NextResponse.json(
      { message: 'Studio Information has been set', newAddress },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error setting new studio information:', errorMessage);
    return new NextResponse(
      `Error setting studio information: ${errorMessage}`,
      {
        status: 500,
      },
    );
  }
};

export const PUT = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const body = await request.json();

  try {
    await connect();
    const studio = await Studio.findById(id);
    if (!studio) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    const updatedStudio = await Studio.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(
      {
        message: 'Studio Information has been updated successfully',
        updatedStudio,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating studio information:', errorMessage);
    return new NextResponse(
      `Error updating  studio information: ${errorMessage}`,
      {
        status: 500,
      },
    );
  }
};
