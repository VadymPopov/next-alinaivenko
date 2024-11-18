import connect from '@/app/lib/db';
import User from '@/app/lib/models/user';

import { type NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    await connect();
    console.log(body);

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 },
      );
    }

    const duplicate = await User.findOne({ email: body.email }).lean().exec();

    if (duplicate) {
      return NextResponse.json({ message: 'Duplicate email' }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(body?.password, 10);
    body.password = hashPassword;

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { message: 'User has been created', newUser },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error adding new user:', errorMessage);
    return new NextResponse(`Error adding new user: ${errorMessage}`, {
      status: 500,
    });
  }
};
