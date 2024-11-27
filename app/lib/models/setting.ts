import { Schema, model, models } from 'mongoose';

const settingSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Setting = models.Setting || model('Setting', settingSchema);

export default Setting;
