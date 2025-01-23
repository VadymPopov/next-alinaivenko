import { SearchBar } from '@/components/ui';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockOnSearch = jest.fn();

describe('SearchBar component', () => {
  it('renders correctly with input field and search icon', () => {
    render(<SearchBar query="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('displays the provided query in the input field', () => {
    render(<SearchBar query="Tattoo" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search appointments');
    expect(input).toHaveValue('Tattoo');
  });

  it('calls onSearch on input change', () => {
    render(<SearchBar query="test" onSearch={mockOnSearch} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('new value');
  });

  it('handles focus styles properly', () => {
    render(<SearchBar query="" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search appointments');
    fireEvent.focus(input);

    expect(input).toHaveClass('focus:outline-accentColor');
  });
});
