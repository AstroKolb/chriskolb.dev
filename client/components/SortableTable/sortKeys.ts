import type { TableKey, TableData, Table } from '@/types';

const compareKeys = (a: TableData, b: TableData, sortDescending: boolean): number => {
   const orderConstant = sortDescending ? 1 : -1;

   // don't sort equal objects
   if (a === undefined && b === undefined) return 0;
   if (a === b) return 0;

   // undefined always last
   if (b === undefined) return -1;
   if (a === undefined) return 1;

   // null 2nd last
   if (b === null) return -1;
   if (a === null) return 1;

   // don't compare different types
   if (typeof a !== typeof b) return 0;

   if (typeof a === 'boolean') return a ? orderConstant : -orderConstant;
   if (typeof b === 'boolean') return b ? -orderConstant : orderConstant;

   return a < b ? orderConstant : -orderConstant;
};

export const sortRowKeys = (
   colKey: TableKey,
   rowKeys: TableKey[],
   dataTable: Table,
   sortParameter: TableKey,
   customCompare:
      | ((aVal: TableData, bVal: TableData, sortDescending: boolean) => number)
      | undefined,
   sortDescending = false
): TableKey[] => {
   const newKeys = [...rowKeys];
   return newKeys.sort((aKey, bKey) => {
      const aVal = dataTable?.[aKey]?.[colKey]?.[sortParameter];
      const bVal = dataTable?.[bKey]?.[colKey]?.[sortParameter];

      return customCompare === undefined
         ? compareKeys(aVal, bVal, sortDescending)
         : customCompare(aVal, bVal, sortDescending);
   });
};

export const sortColKeys = (
   rowKey: TableKey,
   colKeys: TableKey[],
   dataTable: Table,
   sortParameter: TableKey,
   customCompare:
      | ((aVal: TableData, bVal: TableData, sortDescending: boolean) => number)
      | undefined,
   sortDescending = false
): TableKey[] => {
   const newKeys = [...colKeys];
   return newKeys.sort((aKey, bKey) => {
      const aVal = dataTable?.[rowKey]?.[aKey]?.[sortParameter];
      const bVal = dataTable?.[rowKey]?.[bKey]?.[sortParameter];

      return customCompare === undefined
         ? compareKeys(aVal, bVal, sortDescending)
         : customCompare(aVal, bVal, sortDescending);
   });
};

export const exportForTesting = { compareKeys };
