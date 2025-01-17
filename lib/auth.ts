import User from '@/db/models/User';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import connect from '../db/mongodb';

interface IUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: string;
}

interface IUserDocument {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  role?: string;
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        let userRole = 'Admin';

        if (profile?.email == 'vadympopov.dev@gmail.com') {
          userRole = 'Developer';
        }

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: userRole,
        } satisfies IUser;
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        try {
          await connect();
          const foundUser = await User.findOne<IUserDocument>({
            email: credentials?.email,
          })
            .lean<IUserDocument>()
            .exec();

          if (!foundUser) {
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            foundUser.password,
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password or email address');
          }

          return {
            id: foundUser._id.toString(),
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          } satisfies IUser;
        } catch (error) {
          console.error('Error during credentials authorization:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  callbacks: {
    async signIn({ account, profile, credentials }) {
      await connect();

      if (account?.provider === 'google' && profile?.email) {
        const allowedEmails = await User.find({}, { email: 1 }).lean<
          { _id: mongoose.Types.ObjectId; email: string }[]
        >();
        const emailList = allowedEmails.map((user) => user.email);

        if (emailList.includes(profile.email)) {
          return true;
        }
        return false;
      }

      if (account?.provider === 'credentials' && credentials?.email) {
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider) {
          token.provider = account.provider;
        }
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
