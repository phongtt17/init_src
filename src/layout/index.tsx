import { Outlet } from 'react-router-dom';

import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Sidebar from '@/layout/SideBar';
import RightSidebar from '@/layout/SideBar/RightSidebar';

const LayOut = (): JSX.Element => {
  return (
    <div>
      <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <RightSidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default LayOut;
