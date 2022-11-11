import TourNav from './Nav';
import { Outlet } from "react-router-dom";

function TourLayout() {
  return (
    <>
      <TourNav />
      <Outlet />
    </>
  );
}

export default TourLayout;
