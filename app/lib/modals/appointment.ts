import { Schema, model, models } from 'mongoose';

const appointmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      default: 'none',
    },
    service: {
      type: String,
      enum: ['small-tattoo', 'large-tattoo', 'permanent', 'touch-up'],
      required: [true, 'Service is required'],
    },
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
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    description: {
      type: String,
      default: 'none',
    },
    instagram: {
      type: String,
      default: 'none',
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    deposit: {
      amount: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        required: true,
      },
      fee: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  },
  { versionKey: false, timestamps: false },
);

const Appointment =
  models.Appointment || model('Appointment', appointmentSchema);

export default Appointment;
