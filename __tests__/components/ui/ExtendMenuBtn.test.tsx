import { ExtendMenuBtn } from '@/components/ui';

import { fireEvent, render, screen } from '@testing-library/react';

describe('ExtendMenuBtn component', () => {
  it('renders correctly when isExtended is true', () => {
    render(<ExtendMenuBtn toggleSidebar={() => {}} isExtended={true} />);

    expect(screen.getByTestId('extended-icon')).toBeInTheDocument();
  });

  it('renders correctly when isExtended is false', () => {
    render(<ExtendMenuBtn toggleSidebar={() => {}} isExtended={false} />);

    expect(screen.queryByTestId('extended-icon')).not.toBeInTheDocument();
  });

  it('calls toggleSidebar when button is clicked', () => {
    const mockedToogleSidebar = jest.fn();
    render(
      <ExtendMenuBtn toggleSidebar={mockedToogleSidebar} isExtended={true} />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockedToogleSidebar).toHaveBeenCalledTimes(1);
  });
});
