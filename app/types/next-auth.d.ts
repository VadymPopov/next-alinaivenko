import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: string;
    id?: string;
  }

  interface Session {
    user?: DefaultSession['user'] & {
      role?: string;
      id?: string;
      provider?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    id?: string;
    provider?: string;
  }
}
