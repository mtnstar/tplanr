import { adapter } from './axios';
import { CaseType, deserialize } from 'jsonapi-fractal';
import Item from '../../model/Item';

type Items = ReadonlyArray<Item>;

export const fetchTourItems = async (tourId: number): Promise<Items> => {
  const response = await adapter.get(`/api/tours/${tourId}/items`);
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as Item[];
  return data.map((entry: Item) => {
    return entry;
  });
};
