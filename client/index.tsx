import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from '@/components/App';
import { store } from '@/store';
import './index.scss';

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
const root = ReactDOMClient.createRoot(rootContainer);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
