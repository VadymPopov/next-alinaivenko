import connect from '@/app/lib/db';
import User from '@/app/lib/models/user';

import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Missing id', {
        status: 400,
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching user:', errorMessage);
    return new NextResponse(`Error fetching user: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest) => {
  await connect();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing id', {
      status: 400,
    });
  }
  const body = await request.json();

  try {
    const user = await User.findById(id);

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const hashPassword = await bcrypt.hash(body?.password, 10);
    body.password = hashPassword;

    await User.findByIdAndUpdate(id, body);

    return NextResponse.json(
      {
        message: 'Password has been updated successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating password:', errorMessage);
    return new NextResponse(`Error updating  password: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    await connect();

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
