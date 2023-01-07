import { Outlet } from 'react-router-dom';

function ItemListContainer() {
  return (
    <>
      <div className='container mt-4'>
        <Outlet />
      </div>
    </>
  );
}

export default ItemListContainer;
