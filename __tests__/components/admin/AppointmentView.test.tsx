import { mockedAppointment } from '@/__tests__/mocks/mockData';
import { AppointmentView } from '@/components/admin';
import { formatCurrency } from '@/utils/helpers';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('AppointmentView component', () => {
  it('renders correct appointment details', () => {
    render(<AppointmentView appointment={mockedAppointment} />);

    expect(
      screen.getByRole('heading', { name: /client info/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.name)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.email)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /appointment info/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.service)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.date)).toBeInTheDocument();
    expect(screen.getByText(mockedAppointment.slot)).toBeInTheDocument();
    expect(screen.getByText('1h')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /deposit/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.deposit.amount)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.deposit.tax)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.deposit.fee)),
    ).toBeInTheDocument();

    const formattedTotal = formatCurrency(
      mockedAppointment.deposit?.total || 0,
    );
    expect(screen.getByText(`Total: ${formattedTotal}`)).toBeInTheDocument();
  });

  it('renders payment section correctly', () => {
    render(<AppointmentView appointment={mockedAppointment} />);

    expect(
      screen.getByRole('heading', { name: /payment/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.payment?.amount || 0)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.payment?.tax || 0)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.payment?.fee || 0)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockedAppointment.payment?.tip || 0)),
    ).toBeInTheDocument();

    const formattedTotal = formatCurrency(
      mockedAppointment.payment?.total || 0,
    );
    expect(screen.getByText(`Total: ${formattedTotal}`)).toBeInTheDocument();
  });

  it('displays N/A for missing phone and instagram', () => {
    render(<AppointmentView appointment={mockedAppointment} />);

    expect(screen.getAllByText('N/A')).toHaveLength(2);
  });

  it('handles missing payment details gracefully', () => {
    const mockedAppointmentWithoutPayment = {
      ...mockedAppointment,
      payment: undefined,
    };
    render(<AppointmentView appointment={mockedAppointmentWithoutPayment} />);

    expect(screen.getByText('Total: CA$0.00')).toBeInTheDocument();
  });

  it('displays default "No description provided" when description is empty', () => {
    render(<AppointmentView appointment={mockedAppointment} />);

    expect(screen.getByText(/no description provided/i)).toBeInTheDocument();
  });

  it('displays description', () => {
    const mockedAppointmentWithLongDescription = {
      ...mockedAppointment,
      description: 'Tattoo on the right hand black dragon',
    };
    render(
      <AppointmentView appointment={mockedAppointmentWithLongDescription} />,
    );

    expect(
      screen.getByText(/tattoo on the right hand black dragon/i),
    ).toBeInTheDocument();
  });
});
