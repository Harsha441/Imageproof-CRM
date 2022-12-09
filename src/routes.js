import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import SingleBusinessDetails from './pages/SingleBusinessDetails';
import AddingBusiness from './pages/AddingBusiness';
import SingleCustomerDetails from './pages/SingleCustomerDetails';
import BlockedBusiness from './pages/BlockedBusiness';
import VerifiedBusiness from './pages/VerifiedBusiness';
import Appoinment from './pages/Appointment';
import Leads from './pages/Leads';
import EditLeads from './pages/EditLeads';
import Contacts from './pages/Contacts';
import Contract from './pages/Contract';

// ----------------------------------------------------------------------

export default function Router({ loggedIn }) {
  return useRoutes([
    {
      path: '/dashboard',
      element: loggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'leads', element: <Leads /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'addingbusiness', element: <AddingBusiness /> },
        { path: 'singlebusinessdetails', element: <SingleBusinessDetails /> },
        { path: 'editleads', element: <EditLeads /> },
        { path: 'singlecustomerdetails', element: <SingleCustomerDetails /> },
        { path: 'blockedBusiness', element: <BlockedBusiness /> },
        { path: 'verifiedBusiness', element: <VerifiedBusiness /> },
        { path: 'appointment', element: <Appoinment /> },
        { path: 'contacts', element: <Contacts /> },
        { path: 'contract', element: <Contract /> },
      ],
    },
    {
      path: '/',
      element: !loggedIn ? <LogoOnlyLayout /> : <Navigate to="/dashboard/app " />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
