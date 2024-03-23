import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import type { JSX } from "react";

export const AuthGuardComponent = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  const _isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  if (_isAuthenticated || pathname === '/login' ) {
    return children;
  } else {

    if(pathname !== '/'){
      return <Navigate to={`/login?redirect=${pathname}`} replace />;
    } else  {
      return <Navigate to={`/login`} replace />;
    }
  }
};