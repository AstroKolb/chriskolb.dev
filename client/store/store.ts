import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemTable from './itemTable';

const reducer = combineReducers({
   itemTable,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
