import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const User = models.User || model('User', userSchema);

export default User;
