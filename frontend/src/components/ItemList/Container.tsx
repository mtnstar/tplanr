import { Outlet } from 'react-router-dom';
import ItemListNav from './Nav';

function ItemListContainer() {
  return (
    <>
      <ItemListNav />
      <div className='container mt-4'>
        <Outlet />
      </div>
    </>
  );
}

export default ItemListContainer;
