/**
 * APPLICATION ENTRY POINT
 * ========================
 * This is where we connect Redux to our React application.
 *
 * Key Setup:
 * 1. Import the Redux store
 * 2. Import Provider from react-redux
 * 3. Wrap the App component with Provider
 * 4. Pass the store to Provider
 *
 * The Provider component makes the Redux store available to all components
 * in the component tree. Any component that uses useAppSelector or
 * useAppDispatch needs to be a descendant of Provider.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider makes Redux store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
