import { FieldSet } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('FieldSet component', () => {
  it('renders children correctly', () => {
    render(
      <FieldSet title="Legend title">
        <p>This is some content within the FieldSet.</p>
      </FieldSet>,
    );

    const fieldsetElement = screen.getByRole('group');
    expect(fieldsetElement).toBeInTheDocument();

    const legend = screen.getByText('Legend title');
    expect(legend).toBeInTheDocument();

    expect(
      screen.getByText('This is some content within the FieldSet.'),
    ).toBeInTheDocument();
  });
});
