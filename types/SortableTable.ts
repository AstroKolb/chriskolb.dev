// base types
export type TableData = any;
export type TableKey = string;

// data table types
export type TableEntry = Record<TableKey, TableData>;
export type TableColumn = Record<TableKey, TableEntry>;
export type Table = Record<TableKey, TableColumn>;
