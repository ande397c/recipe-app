import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './provider';
import { AppRouter } from './router';
import '@/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>
);
