import { Schema, model, models } from 'mongoose';

const availabilitySchema = new Schema(
  {
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    month: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      required: [true, 'Month is required'],
    },
    blockedDates: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

export const Availability =
  models.Availability || model('Availability', availabilitySchema);
