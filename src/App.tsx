import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { AuthProvider } from './hooks/auth';

import Toast from '@/components/Toast';

import Loading from './layout/Loading';
import routes, { newRouter } from './router';
import Layout from '@/layout/index';
import { loading, toast } from '@/recoil/atom';

const LoginPage = lazy(() => import('@/views/auth/Login'));
const SaleOfPoint = lazy(() => import('@/views/sale-of-point'));

const routerOutside = [
  {
    path: '/auth/login',
    component: <LoginPage />,
  },
  {
    path: '/sale-of-point',
    component: newRouter(SaleOfPoint),
  },
];

const RouteWrap = (): JSX.Element => {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<Loading />}>
            <Layout />{' '}
          </Suspense>
        }
      >
        {routes?.map(({ element, path, index }, idx) => {
          return <Route index={index} key={idx} path={path} element={<Suspense fallback={<Loading />}>{element}</Suspense>} />;
        })}
      </Route>
      {routerOutside.map(({ path, component }) => (
        <Route key={path} path={path} element={<Suspense fallback={<Loading />}>{component}</Suspense>}></Route>
      ))}
    </Routes>
  );
};

function App(): JSX.Element {
  const isLoading = useRecoilValue(loading);
  const [stateToast, setStateToast] = useRecoilState(toast);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [firstLogin, setFirstLogin] = useState(0)
  
  const handleNetworkChange = (): void => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('online', handleNetworkChange);

    return () => {
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('online', handleNetworkChange);
    };
  }, []);


  useEffect(() => {
    const msgToast = {
      message: isOnline ? 'You are online' : 'You are offline',
      type: isOnline ? 'success' : 'error',
      show: true,
    };
    if (firstLogin !== 0 || !isOnline) {
      setStateToast(msgToast);
      setFirstLogin(1)
    }
    setTimeout(() => {
      setStateToast({ ...stateToast, show: false });
    }, 3000);
  }, [isOnline]);

  return (
    <AuthProvider>
      <Toast message={stateToast.message} type={stateToast.type} show={stateToast.show} />
      {isLoading && <Loading />}
      <RouteWrap />
    </AuthProvider>
  );
}

export default App;
