import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

function PrivateRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { user } = useAuth();
  const location = useLocation();
  if (!user?.access_token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoute;
