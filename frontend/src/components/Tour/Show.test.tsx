import { render, screen } from '@testing-library/react';
import { mockComponent } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../../i18n';
import Tour from '../../model/Tour';
import TourShow from './Show';

jest.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: jest.fn(() => null),
}));

jest.mock('../../utils/pdf/TourItemListPdf', () => mockComponent);
jest.mock('../../utils/api/tours');
const { fetchTour } = require('../../utils/api/tours');

function renderTourShowComponent() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <TourShow />,
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );
}

describe('TourShowComponent', () => {
  it('Renders tour attributes', async () => {
    const tourDom: Tour = {
      id: 42,
      label: 'Dom 4545m',
      description: 'Besteigung des höchsten Schweizers',
    };

    fetchTour.mockImplementation(() => tourDom);

    renderTourShowComponent();

    expect(await screen.findByText('Dom 4545m')).toBeInTheDocument();
    expect(
      await screen.findByText('Besteigung des höchsten Schweizers'),
    ).toBeInTheDocument();
  });
});
