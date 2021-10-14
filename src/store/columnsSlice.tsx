import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType, State } from '../type';
const columnsInitialState: ColumnType[] = [
  {
    nameColumn: 'ToDoo',
    id: 1,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'In Progress',
    id: 2,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'Testing',
    id: 3,
    statusAddPopup: false,
    statusChenge: false,
  },
  {
    nameColumn: 'Done',
    id: 4,
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
      { payload }: PayloadAction<{ id: number; newName: string }>,
    ) => {
      if (payload.newName.trim()) {
        const newArrColumn = state.map((column) => {
          if (column.id === payload.id) {
            return { ...column, nameColumn: payload.newName };
          }
          return column;
        });
        return newArrColumn;
      }
    },
    openAddPopup: (state, { payload }: PayloadAction<{ id: number }>) => {
      const newArrColumn = state.map((column) => {
        if (column.id === payload.id) {
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
    statusChengeColumn: (state, { payload }: PayloadAction<{ id: number }>) => {
      const newArrColumn = state.map((column) => {
        if (column.id === payload.id) {
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
export const slelectColumns = (state: State) => state.columns;
