import { ProfileView } from '@/components/admin';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/components/admin/ProfileForm', () => ({
  __esModule: true,
  ProfileForm: () => (
    <div data-testid="mocked-profile-form">Mocked ProfileForm</div>
  ),
}));

describe('ProfileView component', () => {
  it('renders correctly when provider is google', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: 'admin',
          provider: 'google',
          email: 'test@mail.com',
          name: 'Test User',
        },
      },
    }),
      render(<ProfileView />);

    expect(screen.getByText('Test User')).toBeInTheDocument();

    expect(screen.getByAltText('profile picture')).toBeInTheDocument();
    expect(screen.getByAltText('profile picture')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fgatita.png&w=256&q=75',
    );
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/google/i)).toBeInTheDocument();
    expect(screen.queryByTestId('mocked-profile-form')).not.toBeInTheDocument();
  });

  it('renders correctly when user logged in with credentials', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: 'Developer',
          id: '123456789',
          provider: 'credentials',
          email: 'test@mail.com',
          name: 'Test User',
        },
      },
    }),
      render(<ProfileView />);

    expect(screen.getByText('Test User')).toBeInTheDocument();

    expect(screen.getByAltText('profile picture')).toBeInTheDocument();
    expect(screen.getByAltText('profile picture')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fdeveloper.png&w=256&q=75',
    );
    expect(screen.getByText(/developer/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/credentials/i)).toBeInTheDocument();
    expect(screen.getByTestId('mocked-profile-form')).toBeInTheDocument();
  });
});
