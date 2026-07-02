import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { MsaCourseProvider } from './core/contexts/MsaCourseContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsaCourseProvider>
      <App />
    </MsaCourseProvider>
  </StrictMode>,
);

