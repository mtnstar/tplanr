import { useQuery } from 'react-query';
import { SportKind } from '../../model/SportKind';
import { fetchItemLists } from '../api/item_lists';

export const useItemListsQuery = (sportKind: SportKind) =>
  useQuery(['itemLists', sportKind], () => fetchItemLists(sportKind));
