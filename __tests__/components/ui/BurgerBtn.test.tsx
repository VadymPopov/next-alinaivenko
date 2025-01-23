import { BurgerBtn } from '@/components/ui';

import { fireEvent, render, screen } from '@testing-library/react';

describe('ExtendMenuBtn component', () => {
  it('renders correctly when isExtended is true', () => {
    render(<BurgerBtn toggleMenu={() => {}} isOpen={true} />);

    expect(screen.getByTestId('icon-close')).toBeInTheDocument();
  });

  it('renders correctly when isExtended is false', () => {
    render(<BurgerBtn toggleMenu={() => {}} isOpen={false} />);

    expect(screen.getByTestId('icon-open')).toBeInTheDocument();
  });

  it('calls toggleSidebar when button is clicked', () => {
    const mockedToggleMenu = jest.fn();
    render(<BurgerBtn toggleMenu={mockedToggleMenu} isOpen={true} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockedToggleMenu).toHaveBeenCalledTimes(1);
  });
});
