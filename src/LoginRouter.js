import { Navigate, useRoutes } from 'react-router-dom';

export default function LoginRouter() {
  return useRoutes([{ path: '*', element: <Navigate to="/login" /> }]);
}
