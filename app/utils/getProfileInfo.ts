import { Session } from 'next-auth';

export const getProfileInfo = (session: Session | null) => {
  const isGoogle = session?.user?.provider === 'google';
  const isDeveloper = session?.user?.role === 'Developer';
  const profileImageURL =
    isGoogle && session?.user?.image
      ? session.user.image
      : isDeveloper
        ? '/developer.png'
        : '/gatita.png';

  return { isGoogle, profileImageURL };
};
