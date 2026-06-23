import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ExpensesApp } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExpensesApp />
  </StrictMode>,
);
