import { useState, useEffect } from 'react';
import { getStorage, postStorage } from '@/api';
import { SortableTable } from '@/components/SortableTable';
import { itemTable, RootState } from '@/store';
import type { Table, TableData, TableKey, TableEntry } from '@/types';
import css from './tmp.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ItemInputForum } from '@/components/ItemInputForum/ItemInputForum';

// goal list here:
// 1. table for all users/items
//    - a. component to display info for user / item; click-to-sort
// 2. component to display loot info (name, added, received?, prio?)

// feed it a key list, it organizes unless keylist is updated outside component

const testRowKeys = ['1001', '1002', '1003', '1004'];
const testColKeys = ['player1', 'player2', 'player3', 'player4'];

// ----- custom elements -----
const Row = ({ onClick, data }: { onClick: () => void; data: TableKey }): JSX.Element => (
   <button className={css.rowHeader} onClick={onClick} onKeyDown={onClick}>
      {data}
   </button>
);

const Col = ({ onClick, data }: { onClick: () => void; data: TableKey }): JSX.Element => (
   <button className={css.colHeader} onClick={onClick} onKeyDown={onClick}>
      {data}
   </button>
);

const Data = ({ onClick, data }: { onClick: () => void; data: TableEntry }): JSX.Element => (
   <button className={css.tmp} onClick={onClick} onKeyDown={onClick}>
      {data?.prio}
   </button>
);

const compareKeys = (a: TableData, b: TableData, sortDescending: boolean): number => {
   const orderConstant = sortDescending ? 1 : -1;
   if (a === undefined && b === undefined) return 0;
   if (b === undefined) return -1;
   if (a === undefined) return 1;

   if (typeof a === 'boolean') return a ? orderConstant : -orderConstant;
   if (typeof b === 'boolean') return b ? -orderConstant : orderConstant;

   return a < b ? orderConstant : -orderConstant;
};

// ----- element usage -----
export const Pages = (): JSX.Element => {
   const [rowKeys, setRowKeys] = useState<TableKey[]>([]);
   const [colKeys, setColKeys] = useState<TableKey[]>([]);

   const tableData = useSelector((state: RootState) => state.itemTable);
   const dispatch = useDispatch();

   const { update } = itemTable.actions;

   useEffect(() => {
      setRowKeys([...testRowKeys]);
      setColKeys([...testColKeys]);

      postStorage({ name: 'player1', item: '1004', received: false, prio: 4 })
         .then(() => getStorage())
         .then((testData) => {
            let newTableData: Table = {};

            testData.forEach((entry: any) => {
               newTableData = {
                  ...newTableData,
                  [entry.item]: {
                     ...newTableData[entry.item],
                     [entry.name]: entry,
                  },
               };
            });

            return newTableData;
         })
         .then((data) => dispatch(update(data)));
   }, []);

   return (
      <div>
         <ItemInputForum />
         <SortableTable
            className={css.lootTable}
            rowKeys={rowKeys}
            colKeys={colKeys}
            dataTable={tableData}
            customCompare={compareKeys}
            sortParameter="prio"
            RowElement={Row}
            ColElement={Col}
            DataElement={Data}
         />
      </div>
   );
};
