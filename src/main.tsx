import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { PokeballLoader } from './Components/PokeballLoader/PokeballLoader';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PersistGate loading={<PokeballLoader />} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  /* </React.StrictMode> */
);
