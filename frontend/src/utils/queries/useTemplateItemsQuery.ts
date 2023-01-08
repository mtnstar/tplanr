import { useQuery } from 'react-query';
import { fetchTemplateItems } from '../api/template_items';

export const useTemplateItemsQuery = (itemListId: number) =>
  useQuery(['itemListItems', itemListId], () => fetchTemplateItems(itemListId));
