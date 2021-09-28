import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType } from '../type';
const columnsInitialState: ColumnType[] = [
  {
    nameColumn: 'ToDoo',
    idColumn: 1,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'In Progress',
    idColumn: 2,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'Testing',
    idColumn: 3,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'Done',
    idColumn: 4,
    statusAddPopup: false,
    statusChenge: false,
  },
];
export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsInitialState,
  reducers: {
    changeColumnName: (
      state,
      { payload }: PayloadAction<{ columnId: number; newName: string }>,
    ) => {
      if (payload.newName.trim()) {
        const newArrColumn = state.map((column) => {
          if (column.idColumn === payload.columnId) {
            return { ...column, nameColumn: payload.newName };
          }
          return column;
        });
        return newArrColumn;
      }
    },
    openAddPopup: (state, { payload }: PayloadAction<{ columnId: number }>) => {
      const newArrColumn = state.map((column) => {
        if (column.idColumn === payload.columnId) {
          return { ...column, statusAddPopup: true };
        }
        return column;
      });
      return newArrColumn;
    },
    closeAddPopup: (state) => {
      const newArrColumn = state.map((column) => {
        return { ...column, statusAddPopup: false };
      });
      return newArrColumn;
    },
    statusChengeColumn: (
      state,
      { payload }: PayloadAction<{ columnId: number }>,
    ) => {
      const newArrColumn = state.map((column) => {
        if (column.idColumn === payload.columnId) {
          return { ...column, statusChenge: true };
        }
        return column;
      });
      return newArrColumn;
    },
    closeChengeColumn: (state) => {
      const newArrColumn = state.map((column) => {
        return { ...column, statusChenge: false };
      });
      return newArrColumn;
    },
  },
});
