import { getProfileInfo } from '@/utils';

describe('getProfileInfo', () => {
  test.each([
    {
      description: 'Google provider with no image',
      session: {
        user: { role: 'admin', id: '123456789', provider: 'google' },
        expires: '2025-02-27T10:30:00Z',
      },
      expected: { isGoogle: true, profileImageURL: '/gatita.png' },
    },
    {
      description: 'Developer role with Google provider',
      session: {
        user: { role: 'Developer', id: '123456789', provider: 'google' },
        expires: '2025-02-27T10:30:00Z',
      },
      expected: { isGoogle: true, profileImageURL: '/developer.png' },
    },
    {
      description: 'Developer role with credentials provider',
      session: {
        user: { role: 'Developer', id: '123456789', provider: 'credentials' },
        expires: '2025-02-27T10:30:00Z',
      },
      expected: { isGoogle: false, profileImageURL: '/developer.png' },
    },
    {
      description: 'Google provider with an image',
      session: {
        user: {
          role: 'User',
          id: '123456789',
          provider: 'google',
          image: '/custom.png',
        },
        expires: '2025-02-27T10:30:00Z',
      },
      expected: { isGoogle: true, profileImageURL: '/custom.png' },
    },
    {
      description: 'Null session',
      session: null,
      expected: { isGoogle: false, profileImageURL: '/gatita.png' },
    },
    {
      description: 'Developer role with different casing',
      session: {
        user: { role: 'dEvElOpEr', id: '123456789', provider: 'credentials' },
        expires: '2025-02-27T10:30:00Z',
      },
      expected: { isGoogle: false, profileImageURL: '/developer.png' },
    },
  ])(
    'should return correct profile info for $description',
    ({ session, expected }) => {
      expect(getProfileInfo(session)).toStrictEqual(expected);
    },
  );
});
