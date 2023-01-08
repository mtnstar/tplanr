import { useParams } from 'react-router-dom';
import { useItemListQuery } from '../../utils/queries/useItemListQuery';
import ItemList from '../Item/List';

function ItemListShow() {
  const { id } = useParams();
  const { data: entry } = useItemListQuery(+id!);

  return (
    <>
      <h3 className='mb-4'>{entry?.templateLabel}</h3>
      <ItemList />
    </>
  );
}

export default ItemListShow;
