import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import SportKindContext from '../../utils/providers/SportKindContext';
import { useToursQuery } from '../../utils/queries/useToursQuery';
import Tour from '../../model/Tour';

const queryClient = new QueryClient()

export default function ToursList() {
  const [entries, setEntries] = React.useState([]);
  return (
    <QueryClientProvider client={queryClient}>
      <Entries />
    </QueryClientProvider>
  )
}

function Entries() {

  const sportKind = React.useContext(SportKindContext);
  const { data } = useToursQuery(sportKind);

  // const { isLoading, error, data } = useQuery('repoData', () =>
    // fetch('/api/tours').then(res =>
      // res.json()
    // )
  // )

  if (!data) return null;

  // if (error) return null;

  // const items: string[] = entries.map((entry: SportKind) => entry.label);
  //
  const entries = data.map((tour: Tour) => TourEntry(tour));

  return (
    <>
    <div>{entries}</div>
    </>
  )
}

function TourEntry(tour: Tour) {
  return (<div key={tour.id}>{tour.label}</div>);
}
