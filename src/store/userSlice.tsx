import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userInitialState: string = '';

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ userName: string }>) => {
      if (payload.userName !== state) {
        return payload.userName;
      }
    },
  },
});
