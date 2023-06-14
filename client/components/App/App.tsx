import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';
import css from './App.module.scss';

export const App = (): JSX.Element => (
   <div className={css.app}>
      <BrowserRouter>
         <Routes>
            <Route index={true} element={<div>Hello World</div>} />
            {/* all routes go here */}
            {routes.map((route) => (
               <Route key={route.name} path={`/${route.name}`} element={route.display} />
            ))}
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </BrowserRouter>
   </div>
);
