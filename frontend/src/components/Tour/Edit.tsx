import { useParams } from 'react-router-dom';
import { useTourQuery } from '../../utils/queries/useTourQuery';
import TourForm from './Form';

function TourEdit() {
  const { id } = useParams();
  const { data: entry } = useTourQuery(Number(id));

  if (!entry) return null;

  return (
    <div className='container'>
      <TourForm entry={entry} />
    </div>
  );
}

export default TourEdit;
