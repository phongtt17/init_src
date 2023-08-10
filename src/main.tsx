import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'modern-normalize';
import { RecoilRoot } from 'recoil';

import '@/assets/scss/app.scss';

import App from './App';
import i18n from '@/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 86400000,
    },
  },
});

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          <Router>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
