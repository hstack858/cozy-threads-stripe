import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout: React.FC = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

export default Layout;
