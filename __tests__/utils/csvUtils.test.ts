import { mockedAppointments } from '@/__mocks__/mockData';
import { downloadCSV, generateCSV } from '@/utils';

describe('generateCSV', () => {
  it('should generate the correct CSV format', () => {
    const csvContent = generateCSV(mockedAppointments);

    expect(csvContent).toContain(
      'Name,Date,Service,Email,Deposit Amount,Deposit Tax,Deposit Fee,Deposit Total,Payment Amount,Payment Tax,Payment Fee,Payment Total,Total Tax,Total Fee,Income,Tip',
    );

    expect(csvContent).toContain(
      'Test 1,2025-02-10,Small Tattoo,test1@mail.com,100,13,5,118',
    );

    expect(csvContent).toContain(
      'Test 2,2025-02-11,Large Tattoo,test2@mail.com,150,19.5,7.5,177,0,0,0,0,19.5,7.5,150,0',
    );

    expect(csvContent).toContain(
      'Test 3,2025-02-12,Permanent Makeup,test3@mail.com,50,6.5,2.5,59,0,0,0,0,6.5,2.5,50,0',
    );

    expect(csvContent).toContain('Total,,,,300,39,15,354,0,0,0,0,39,15,300,0');
  });
});

describe('downloadCSV', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('mockedURL');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should trigger a download with correct filename and content', () => {
    const mockData =
      'Name,Date,Service,Email\nJohn,2025-02-10,Tattoo,john@example.com\n';
    const filename = 'appointments.csv';

    const linkElement = document.createElement('a');

    const clickSpy = jest.spyOn(linkElement, 'click');

    downloadCSV(mockData, filename, linkElement);

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(linkElement.download).toBe(filename);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle errors gracefully', () => {
    const linkElement = document.createElement('a');
    const mockError = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {});

    downloadCSV(null as unknown as string, 'appointments.csv', linkElement);

    expect(mockError).toHaveBeenCalledWith(
      'Failed to download CSV:',
      expect.any(Error),
    );
    mockError.mockRestore();
  });
});
