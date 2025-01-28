import { SelectField } from '@/components/ui';

import { useForm } from 'react-hook-form';

import { fireEvent, render, screen } from '@testing-library/react';

describe('SelectField Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const MockedSelect = ({
    label,
    error,
    placeholder,
    defaultValue,
    admin,
  }: {
    label?: string;
    error?: string;
    placeholder?: string;
    defaultValue?: string;
    admin?: boolean;
  }) => {
    return (
      <SelectField
        control={useForm({ defaultValues: { service: defaultValue } }).control}
        label={label}
        name="service"
        options={mockOptions}
        error={error}
        placeholder={placeholder}
        admin={admin}
      />
    );
  };

  it('renders select with label and initial value', () => {
    render(<MockedSelect label="Service" defaultValue="option1" />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders checkmark if an option is selected', () => {
    render(<MockedSelect defaultValue="option2" />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByLabelText('Valid input')).toBeInTheDocument();
  });

  it('renders select with placeholder when no initial value is provided', () => {
    render(<MockedSelect placeholder="Select a service" />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a service')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    render(<MockedSelect placeholder="Select a service" />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'option1' },
    });

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    render(<MockedSelect error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('handles admin prop', () => {
    render(<MockedSelect admin />);

    expect(screen.getByTestId('select-container')).toHaveClass(
      'w-40 flex flex-col',
    );
  });
});
