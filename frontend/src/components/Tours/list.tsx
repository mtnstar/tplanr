import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function ToursList() {
     return (
       <QueryClientProvider client={queryClient}>
        <Entries />
       </QueryClientProvider>
   )
}

function Entries() {

  const { isLoading, error, data } = useQuery('repoData', () =>
     fetch('/api/tours').then(res =>
       res.json()
     )
   )

   if (isLoading) return null;

   if (error) return null; 

  const items: string[] = data.data.map((entry: any) => entry.attributes.label);

   return (
     <div>{items}</div>
   )
}
