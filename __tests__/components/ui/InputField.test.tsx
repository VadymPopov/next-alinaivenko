import { InputField } from '@/components/ui';

import { useFormContext } from 'react-hook-form';

import { render, screen } from '@testing-library/react';

jest.mock('react-hook-form');

describe('InputField component', () => {
  const mockUseForm = jest.fn().mockReturnValue({
    register: jest.fn().mockReturnValue({}),
    watch: jest.fn().mockReturnValue(''),
  });

  beforeEach(() => {
    (useFormContext as jest.Mock).mockImplementation(mockUseForm);
  });

  it('renders a text input field correctly', () => {
    render(<InputField label="First Name" name="firstname" type="text" />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a textarea field correctly', () => {
    render(<InputField name="description" label="Description" textarea />);

    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a checkbox field correctly', () => {
    render(<InputField label="Conditions" name="conditions" type="checkbox" />);

    expect(screen.getByLabelText('Conditions')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('w-5 h-5 mr-5');
  });

  it('renders an error message correctly with styles', () => {
    render(
      <InputField name="email" label="Email" error="Invalid email address" />,
    );
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.queryByTestId('checkmark')).not.toBeInTheDocument();

    expect(screen.getByLabelText('Email')).toHaveClass('border-error');
  });

  it('displays a checkmark for valid input', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue({}),
      watch: jest.fn().mockReturnValue('test'),
    });

    render(<InputField name="username" label="Username" />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkmark')).toBeInTheDocument();
  });

  it('shows optional text correctly', () => {
    render(
      <InputField label="First Name" name="firstname" type="text" optional />,
    );

    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const customStyle = 'bg-blue-100 border-blue-500';
    render(
      <InputField
        name="customStyleTest"
        label="Custom Style"
        styles={customStyle}
      />,
    );

    expect(screen.getByLabelText('Custom Style')).toHaveClass(
      'bg-blue-100 border-blue-500',
    );
  });

  it('renders correctly in admin mode', () => {
    render(<InputField name="adminTest" label="Admin Test" admin />);

    expect(screen.getByTestId('input-container')).toHaveClass('flex');
  });

  it('displays placeholder text', () => {
    render(
      <InputField
        name="placeholderTest"
        label="Placeholder Test"
        placeholder="Enter your value here"
      />,
    );

    expect(
      screen.getByPlaceholderText('Enter your value here'),
    ).toBeInTheDocument();
  });
});
