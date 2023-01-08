import { useQuery } from 'react-query';
import { ItemList } from '../../model/ItemList';
import { fetchItemList } from '../api/item_lists';

export const useItemListQuery = (id: number) =>
  useQuery<ItemList>(['itemLists', id], () => fetchItemList(id));
