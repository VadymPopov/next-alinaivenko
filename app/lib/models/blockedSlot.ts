import { Schema, model, models } from 'mongoose';

const blockedSlotSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    slot: {
      type: String,
      required: [true, 'Slot is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      validate: {
        validator(value: number) {
          return value % 30 === 0;
        },
        message: 'Duration must be a multiple of 30.',
      },
    },
    reason: {
      type: String,
      default: 'Break',
    },
  },
  { versionKey: false, timestamps: true },
);

const BlockedSlot =
  models.BlockedSlot || model('BlockedSlot', blockedSlotSchema);

export default BlockedSlot;
