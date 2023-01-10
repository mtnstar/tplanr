import { useParams } from 'react-router-dom';
import { useItemListQuery } from '../../utils/queries/useItemListQuery';
import ItemList from '../Item/List';

function ItemListShow() {
  return (
    <>
      <ItemList />
    </>
  );
}

export default ItemListShow;
