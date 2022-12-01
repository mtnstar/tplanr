import TourForm from './Form';
import Tour from '../../model/Tour';

export default function TourNew() {
  const entry: Tour = {};

  return (
    <div className='container'>
      <TourForm entry={entry} />
    </div>
  );
}
