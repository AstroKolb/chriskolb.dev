import { useState, useEffect } from 'react';
import type { TableKey, TableData, Table } from '@/types';
import { sortRowKeys, sortColKeys } from './sortKeys';
import css from './SortableTable.module.scss';

// check for unique keys!!

type TableComponent = {
   onClick: () => void;
   data: TableData;
};

export type SortableTable = {
   rowKeys: TableKey[];
   colKeys: TableKey[];
   dataTable: Table;
   sortParameter: TableKey;
   RowElement: React.ComponentType<TableComponent>;
   ColElement: React.ComponentType<TableComponent>;
   DataElement: React.ComponentType<TableComponent>;
   customCompare?: (a: TableData, b: TableData, sortDescending: boolean) => number;
   disableRowSorting?: boolean;
   disableColSorting?: boolean;
   className?: string;
   style?: React.CSSProperties;
};

// ----- component -----
export const SortableTable = ({
   rowKeys,
   colKeys,
   dataTable,
   sortParameter,
   RowElement,
   ColElement,
   DataElement,
   customCompare = undefined,
   disableRowSorting = false,
   disableColSorting = false,
   className = '',
   style = {},
}: SortableTable): JSX.Element => {
   const [sortedRowKeys, setSortedRowKeys] = useState<TableKey[]>([]);
   const [sortedColKeys, setSortedColKeys] = useState<TableKey[]>([]);

   const [rowIsDescending, setRowIsDescending] = useState<Record<TableKey, boolean>>({});
   const [colIsDescending, setColIsDescending] = useState<Record<TableKey, boolean>>({});

   // re-init row/col keys only when we receive an update
   useEffect(() => {
      setSortedRowKeys([...rowKeys]);
      setSortedColKeys([...colKeys]);

      setRowIsDescending({ ...rowKeys.reduce((out, key) => ({ ...out, [key]: false }), {}) });
      setColIsDescending({ ...colKeys.reduce((out, key) => ({ ...out, [key]: false }), {}) });
   }, [rowKeys, colKeys]);

   const sortRows = (colKey: TableKey): void => {
      if (disableRowSorting) return;
      const sortDescending = colIsDescending[colKey];
      const newKeys = sortRowKeys(
         colKey,
         sortedRowKeys,
         dataTable,
         sortParameter,
         customCompare,
         sortDescending
      );
      setSortedRowKeys(newKeys);
      setColIsDescending({ ...colIsDescending, [colKey]: !colIsDescending[colKey] });
   };

   const sortCols = (rowKey: TableKey): void => {
      if (disableColSorting) return;
      const sortDescending = rowIsDescending[rowKey];
      const newKeys = sortColKeys(
         rowKey,
         sortedColKeys,
         dataTable,
         sortParameter,
         customCompare,
         sortDescending
      );
      setSortedColKeys(newKeys);
      setRowIsDescending({ ...rowIsDescending, [rowKey]: !rowIsDescending[rowKey] });
   };

   const colHeaders = (
      <div>
         <div />
         {sortedColKeys.map((colKey) => (
            <ColElement key={colKey} data={colKey} onClick={(): void => sortRows(colKey)} />
         ))}
      </div>
   );

   const genRowElement = (rowKey: TableKey): JSX.Element => (
      <div key={rowKey}>
         <RowElement data={rowKey} onClick={(): void => sortCols(rowKey)} />
         {sortedColKeys.map((colKey: TableKey) => (
            <DataElement
               key={`${rowKey}_${colKey}`}
               data={dataTable?.[rowKey]?.[colKey]}
               onClick={(): void => {}}
            />
         ))}
      </div>
   );

   const rowElements = sortedRowKeys.map((rowKey: TableKey) => genRowElement(rowKey));

   return (
      <div className={`${className} ${css.sortableTable}`} style={style}>
         {colHeaders}
         {rowElements}
      </div>
   );
};
