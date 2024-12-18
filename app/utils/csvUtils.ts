import { IAppointment } from '../components/AppointmentDetails';

export const generateCSV = (appointments: IAppointment[]) => {
  type FormattedRow = {
    Name: string;
    Date: string;
    Service: string;
    Email: string;
    'Deposit Amount': number;
    'Deposit Tax': number;
    'Deposit Fee': number;
    'Deposit Total': number;
    'Payment Amount': number;
    'Payment Tax': number;
    'Payment Fee': number;
    'Payment Total': number;
    'Total Tax': number;
    'Total Fee': number;
    Income: number;
    Tip: number;
  };

  const formattedData: FormattedRow[] = appointments.map((app) => ({
    Name: app.name,
    Date: app.date,
    Service: app.service,
    Email: app.email,
    'Deposit Amount': app.deposit.amount,
    'Deposit Tax': app.deposit.tax,
    'Deposit Fee': app.deposit.fee,
    'Deposit Total': app.deposit.total,
    'Payment Amount': app.payment?.amount || 0,
    'Payment Tax': app.payment?.tax || 0,
    'Payment Fee': app.payment?.fee || 0,
    'Payment Total': app.payment?.total || 0,
    'Total Tax': app.deposit.tax + (app.payment?.tax || 0),
    'Total Fee': app.deposit.fee + (app.payment?.fee || 0),
    Income: app.deposit.amount + (app.payment?.amount || 0),
    Tip: app.payment?.tip || 0,
  }));

  const totals: Partial<Record<keyof FormattedRow, number>> =
    formattedData.reduce(
      (acc: Partial<Record<keyof FormattedRow, number>>, row) => {
        Object.keys(row).forEach((key) => {
          if (typeof row[key as keyof FormattedRow] === 'number') {
            const numericKey = key as keyof FormattedRow;
            acc[numericKey] =
              (acc[numericKey] || 0) + (row[numericKey] as number);
          }
        });
        return acc;
      },
      {},
    );

  const totalRow: FormattedRow = {
    Name: 'Total',
    Date: '',
    Service: '',
    Email: '',
    'Deposit Amount': totals['Deposit Amount'] || 0,
    'Deposit Tax': totals['Deposit Tax'] || 0,
    'Deposit Fee': totals['Deposit Fee'] || 0,
    'Deposit Total': totals['Deposit Total'] || 0,
    'Payment Amount': totals['Payment Amount'] || 0,
    'Payment Tax': totals['Payment Tax'] || 0,
    'Payment Fee': totals['Payment Fee'] || 0,
    'Payment Total': totals['Payment Total'] || 0,
    'Total Tax': totals['Total Tax'] || 0,
    'Total Fee': totals['Total Fee'] || 0,
    Income: totals['Income'] || 0,
    Tip: totals['Tip'] || 0,
  };

  const headers = Object.keys(
    formattedData[0],
  ) as (keyof (typeof formattedData)[0])[];

  const csvContent = [
    headers.join(','),
    ...formattedData.map((row) =>
      headers.map((header) => row[header]).join(','),
    ),
    headers.map((header) => totalRow[header] ?? '').join(','),
  ].join('\n');
  return csvContent;
};
export const downloadCSV = (
  data: string,
  filename: string,
  linkElement: HTMLAnchorElement,
) => {
  try {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    linkElement.href = url;
    linkElement.download = filename;
    linkElement.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download CSV:', error);
  }
};
