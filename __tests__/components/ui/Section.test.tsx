import { Section } from '@/components/ui';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Section component', () => {
  it('renders correctly', () => {
    render(
      <Section>
        <p>Test section text</p>
      </Section>,
    );

    const section = screen.getByTestId('section');

    expect(section).toBeInTheDocument();
    expect(screen.getByText('Test section text')).toBeInTheDocument();
  });

  it('applies correct class when primary is true', () => {
    render(
      <Section primary>
        <p>Test section text</p>
      </Section>,
    );
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('bg-bgColor');
  });

  it('applies correct class when primary is false', () => {
    render(
      <Section>
        <p>Test section text</p>
      </Section>,
    );
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('bg-mainLightColor');
    expect(section).not.toHaveClass('bg-bgColor');
  });
});
