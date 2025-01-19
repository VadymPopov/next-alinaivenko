import { Schema, model, models } from 'mongoose';

const studioSchema = new Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    latitude: {
      type: String,
      required: [true, 'Latitude is required'],
    },
    longitude: {
      type: String,
      required: [true, 'Longitude is required'],
    },
  },
  { versionKey: false, timestamps: true, collection: 'studio' },
);

export const Studio = models.Studio || model('Studio', studioSchema);
