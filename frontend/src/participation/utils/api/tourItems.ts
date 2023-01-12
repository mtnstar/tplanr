import adapter from './axios';
import { CaseType, deserialize } from 'jsonapi-fractal';
import ItemListItem from '../../../model/ItemListItem';

type ItemListItems = ReadonlyArray<ItemListItem>;

export const fetchParticipationTourItems = async (
  tourParticipationUid: string,
): Promise<ItemListItems> => {
  const response = await adapter().get(
    `/api/participation/tours/${tourParticipationUid}/items`,
  );
  const data = deserialize(response.data, {
    changeCase: CaseType.camelCase,
  }) as ItemListItem[];
  return data.map((entry: ItemListItem) => {
    return entry;
  });
};

export default fetchParticipationTourItems;
