import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import Tour from '../../model/Tour';
import { Link, useParams } from 'react-router-dom';

export default function TourShow() {
  return (
    <>
      <TourEntry />
    </>
  );
}

function TourEntry() {
  const { id } = useParams();

  const { data } = useTourQuery(+id!);

  // const { isLoading, error, data } = useQuery('repoData', () =>
  // fetch('/api/tours').then(res =>
  // res.json()
  // )
  // )

  if (!data) return null;

  // if (error) return null;

  // const items: string[] = entries.map((entry: SportKind) => entry.label);
  //

  return (
    <>
      <Link to={`/tours/${data.id}/edit`}>
        <button type='button'>Edit</button>
      </Link>
      <div>{data.label}</div>
    </>
  );
}
