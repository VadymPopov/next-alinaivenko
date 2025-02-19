import { DoughnutChart } from '@/components/admin';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => (
    <div data-testid="mock-doughnut-chart">Mocked Doughnut Chart</div>
  ),
}));

const mockedServiceData = [
  { service: 'Small Tattoo', count: 10 },
  { service: 'Large Tattoo', count: 5 },
  { service: 'Permanent Makeup', count: 5 },
  { service: 'Touch-up', count: 2 },
];

describe('DoughnutChart component', () => {
  it('renders chart with correct labels and data', () => {
    render(<DoughnutChart serviceData={mockedServiceData} />);

    const labels = mockedServiceData.map((d) => d.service);
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.getByTestId('mock-doughnut-chart')).toBeInTheDocument();
  });
});
