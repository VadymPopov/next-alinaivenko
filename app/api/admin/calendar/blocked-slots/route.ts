import connect from '@/app/lib/db';
import BlockedSlot from '@/app/lib/models/blockedSlot';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const weekStart = searchParams.get('start');
    const weekEnd = searchParams.get('end');
    let blockedSlots;

    if (date) {
      blockedSlots = await BlockedSlot.find({
        date,
      });
    } else {
      blockedSlots = await BlockedSlot.find({
        date: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      });
    }

    return NextResponse.json(blockedSlots, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching blocked slots:', errorMessage);
    return new NextResponse(
      `Error in fetching blocked slots: ${errorMessage}`,
      {
        status: 500,
      },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connect();

    const { date, slot, duration, reason } = await request.json();

    if (!date || !slot || !duration) {
      return new NextResponse('Date and slot, duration are required', {
        status: 400,
      });
    }

    const blockedSlot = new BlockedSlot({ date, slot, duration, reason });
    await blockedSlot.save();

    return new NextResponse('Slot successfully blocked', { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error blocking slot:', errorMessage);
    return new NextResponse(`Error blocking slot: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    await connect();
    const result = await BlockedSlot.findByIdAndDelete(id);
    if (!result) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    return NextResponse.json(
      {
        message: 'Blocked slot has been deleted',
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error deleting Blocked slot:', errorMessage);
    return new NextResponse(`Error deleting Blocked slot: ${errorMessage}`, {
      status: 500,
    });
  }
};
