import { SLOT_TIMES } from '@/constants';
import { Appointment, BlockedSlot, connect } from '@/db';

import { type NextRequest, NextResponse } from 'next/server';

const SLOT_DURATION = 30;

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const duration = searchParams.get('duration');
    const isEditing = searchParams.get('isEditing') === 'true';
    const currentAppointmentId = searchParams.get('id');

    if (!date || !duration) {
      return new NextResponse('Missing date or duration in the query', {
        status: 400,
      });
    }

    const procedureDurationInSlots = Number(duration) / SLOT_DURATION;
    const availableSlots: string[] = [];

    const slots = SLOT_TIMES.map((time) => ({ time, available: true }));

    const [appointments, blockedSlots] = await Promise.all([
      Appointment.find({ date }),
      BlockedSlot.find({ date }),
    ]);

    appointments.forEach((appointment) => {
      if (isEditing && appointment.id === currentAppointmentId) return;

      const appointmentIdx = slots.findIndex(
        (slot) => slot.time === appointment.slot,
      );

      if (appointmentIdx !== -1) {
        const totalSlotsNeeded = appointment.duration / SLOT_DURATION;

        for (
          let i = appointmentIdx;
          i < appointmentIdx + totalSlotsNeeded;
          i++
        ) {
          if (i >= slots.length) break;
          slots[i].available = false;
        }
      }
    });

    blockedSlots.forEach((blocked) => {
      const blockedIdx = slots.findIndex((slot) => slot.time === blocked.slot);

      if (blockedIdx !== -1) {
        const totalSlotsNeeded = blocked.duration / SLOT_DURATION;

        for (let i = blockedIdx; i < blockedIdx + totalSlotsNeeded; i++) {
          if (i >= slots.length) break;
          slots[i].available = false;
        }
      }
    });

    if (isEditing && currentAppointmentId) {
      const currentAppointment =
        await Appointment.findById(currentAppointmentId);

      if (currentAppointment) {
        const appointmentIdx = slots.findIndex(
          (slot) => slot.time === currentAppointment.slot,
        );

        if (appointmentIdx !== -1) {
          const totalSlotsNeeded = currentAppointment.duration / SLOT_DURATION;

          for (
            let i = appointmentIdx;
            i < appointmentIdx + totalSlotsNeeded;
            i++
          ) {
            if (i >= slots.length) break;
            slots[i].available = true;
          }
        }
      }
    }

    const isAvailableSlotRange = (startIdx: number) => {
      for (let j = 0; j < procedureDurationInSlots; j++) {
        if (!slots[startIdx + j]?.available) return false;
      }
      return true;
    };

    for (let i = 0; i <= slots.length - procedureDurationInSlots; i++) {
      if (isAvailableSlotRange(i)) {
        availableSlots.push(slots[i].time);
      }
    }

    return NextResponse.json(availableSlots, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching available slots:', errorMessage);
    return new NextResponse(
      `Error in fetching available slots: ${errorMessage}`,
      {
        status: 500,
      },
    );
  }
};
