import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SportKindContext from '../../utils/providers/SportKindContext';
import { useToursQuery } from '../../utils/queries/useToursQuery';
import Table from 'react-bootstrap/Table';
import Tour from '../../model/Tour';

const queryClient = new QueryClient();

export default function ToursList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToursTable />
    </QueryClientProvider>
  );
}

function ToursTable() {
  const { sportKind } = React.useContext(SportKindContext);
  const { data } = useToursQuery(sportKind);
  const { t } = useTranslation();
  const navigate = useNavigate();

  function TourRow(tour: Tour) {
    function showTour(tour: Tour) {
      navigate(`/tours/${tour.id}`);
    }

    return (
      <tr onClick={() => showTour(tour)} key={tour.id}>
        <td>
          {tour.avatar && <img src={tour.avatar.thumb.url} alt='Tour Avatar' />}
        </td>
        <td>{tour.label}</td>
        <td>{tour.description}</td>
        <td>22.11 - 24.11.2022</td>
      </tr>
    );
  }

  // const { isLoading, error, data } = useQuery('repoData', () =>
  // fetch('/api/tours').then(res =>
  // res.json()
  // )
  // )

  if (!data || data.length === 0) {
    return <p>{t('global.no_entries')}</p>;
  }

  // if (error) return null;

  // const items: string[] = entries.map((entry: SportKind) => entry.label);
  //
  const rows = data.map((tour: Tour) => TourRow(tour));

  return (
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>{t('label', { keyPrefix: 'tour.attrs' })}</th>
          <th>{t('description', { keyPrefix: 'tour.attrs' })}</th>
          <th>{t('time_period', { keyPrefix: 'tour.attrs' })}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
