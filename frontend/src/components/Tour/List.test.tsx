import { cleanup, render, screen } from '@testing-library/react';
import { mockComponent } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../../i18n';
import SportKindContext from '../../utils/providers/SportKindContext';
import ToursList from './List';
import Tour from '../../model/Tour';

jest.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: jest.fn(() => null),
}));

jest.mock('../../utils/pdf/TourItemListPdf', () => mockComponent);
jest.mock('../../utils/api/tours');
const { fetchTours } = require('../../utils/api/tours');

function renderTourListComponent() {
  const queryClient = new QueryClient();

  const setSportKind = jest.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <SportKindContext.Provider
        value={{
          sportKind: 'alpine_summer',
          setSportKind: setSportKind,
        }}
      >
        <ToursList />
      </SportKindContext.Provider>
      ,
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );
}

describe('TourListComponent', () => {
  it('Renders a table of available tours', async () => {
    const tourDom: Tour = {
      id: 42,
      label: 'Dom 4545m',
      description: 'Besteigung des höchsten Schweizers',
    };

    fetchTours.mockImplementation(() => [tourDom]);

    renderTourListComponent();

    expect(await screen.findByText('Dom 4545m')).toBeInTheDocument();
    expect(
      await screen.findByText('Besteigung des höchsten Schweizers'),
    ).toBeInTheDocument();
  });
});
