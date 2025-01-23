import { ErrorBoundary } from '@/components/ui';

import { fireEvent, render, screen } from '@testing-library/react';

describe('ErrorBoundary component', () => {
  it('renders correctly when isExtended is true', () => {
    render(
      <ErrorBoundary error={new Error('Simulated Error')} reset={() => {}} />,
    );

    expect(
      screen.getByText('Oops! Something went wrong. Simulated Error'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls reset function on button click', () => {
    const mockReset = jest.fn();
    render(
      <ErrorBoundary error={new Error('Simulated Error')} reset={mockReset} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
