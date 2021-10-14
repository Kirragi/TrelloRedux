import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../type';

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ userName: string }>) => {
      if (payload.userName !== state) {
        return payload.userName;
      }
    },
  },
});

export const slelectUser = (state: State) => state.user;
