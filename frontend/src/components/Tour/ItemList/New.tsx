import { useParams } from 'react-router-dom';
import { createTourItemList } from '../../../utils/api/tours';

export default function TourItemListNew() {
  const { id: tourId } = useParams();
  const createItemList = () => {
    createTourItemList(undefined, Number(tourId)).then(() => {
      console.log('item list created');
    });
  };
  return <button onClick={() => createItemList()}>New item list ...</button>;
}
