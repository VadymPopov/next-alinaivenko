import { ServiceCard } from '@/components/site';
import { useAppContext } from '@/providers/AppContext';
import { serviceType } from '@/types';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AppContext', () => ({
  useAppContext: jest.fn(),
}));

const mockServiceData = {
  imgURL: '/images/small-tattoo.jpg',
  title: 'Small Tattoo' as serviceType,
  price: 'CA$120-250',
  deposit: 'CA$100',
  size: 'up to 10 cm',
  duration: '1.2h',
};

describe('ServiceCard component', () => {
  let mockSetService: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockSetService = jest.fn();
    mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useAppContext as jest.Mock).mockReturnValue({
      setService: mockSetService,
    });
  });

  it('renders component correctly', () => {
    render(<ServiceCard {...mockServiceData} />);

    expect(screen.getByAltText(mockServiceData.title)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(mockServiceData.price)),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(mockServiceData.deposit)),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(mockServiceData.size)),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(mockServiceData.duration)),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /book now/i }),
    ).toBeInTheDocument();
  });

  it('calls setService on btn click', () => {
    render(<ServiceCard {...mockServiceData} />);
    const btn = screen.getByRole('button', { name: /book now/i });

    fireEvent.click(btn);
    expect(mockSetService).toHaveBeenCalledWith(mockServiceData.title);
    expect(mockPush).toHaveBeenCalledWith('/booking');
  });
});
