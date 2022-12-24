import { Outlet } from 'react-router-dom';
import TourNav from './Nav';

function TourContainer() {
  return (
    <>
      <TourNav />
      <div className='container mt-4'>
        <Outlet />
      </div>
    </>
  );
}

export default TourContainer;
