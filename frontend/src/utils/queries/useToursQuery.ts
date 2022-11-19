import Tour from '../../model/Tour';
import { SportKind } from '../../model/SportKind';
import { useQuery } from 'react-query';
import axios from 'axios';
import { deserialize } from 'jsonapi-fractal';

type Tours = ReadonlyArray<Tour>;

const fetchTours = async (sportKind: SportKind): Promise<Tours> => {
  const response = await axios.get('/api/tours', {
    params: { filter: { sport_kind: sportKind } },
  });
  const data = deserialize(response.data) as any;
  return data.map((entry: any) => entry as Tour);
};

export const useToursQuery = (sportKind: SportKind) =>
  useQuery(['tours', sportKind], () => fetchTours(sportKind));
