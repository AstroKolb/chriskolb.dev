import { InputPage, Pages } from './pages';
export const routes = [
   { name: 'test', display: <Pages /> },
   { name: 'input', display: <InputPage /> },
   { name: 'admin', display: <div>secret admin panel</div> },
];
