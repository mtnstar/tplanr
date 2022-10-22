import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import SportKindContext from '../../utils/providers/SportKindContext';

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

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('/api/tours').then(res =>
      res.json()
    )
  )

  if (isLoading) return null;

  if (error) return null; 

  const items: string[] = data.data.map((entry: any) => entry.attributes.label);

  return (
    <>
    <div>{sportKind}</div>
    <div>{items}</div>
    </>
  )
}
