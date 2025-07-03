import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

async function enableMocking() {
  const {worker} = await import("./mocks/browser");
  return worker.start();
}

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Failed to find root element.');

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
