import connect from '@/app/lib/db';
import BlockedSlot from '@/app/lib/models/blockedSlot';

import { NextRequest, NextResponse } from 'next/server';

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
