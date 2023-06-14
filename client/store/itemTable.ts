import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TableData, TableEntry } from 'types/SortableTable';

const initialState: TableData = {};

export const itemTable = createSlice({
   name: 'itemTable',
   initialState,
   reducers: {
      update: (state, action: PayloadAction<TableData>) => ({ ...state, ...action.payload }),
      addItem: (state, action: PayloadAction<TableEntry>) => {
         const { date, character, itemId, offSpec, transactionId } = action.payload;
         const oldTableEntry = state?.[itemId]?.[character];
         const newTableEntry: TableEntry = {
            name: character,
            item: itemId,
            received: true,
            prio: oldTableEntry?.prio || null,
         };

         return {
            ...state,
            [itemId]: {
               ...state[itemId], // { ...undefined } === {}
               [character]: newTableEntry,
            },
         };
      },
      // removeItem: () => (),
      reset: () => ({ ...initialState }),
      clear: () => ({}),
   },
});

export default itemTable.reducer;
