import { combineReducers } from 'redux';
import { userSlice } from './userSlice';
import { cardsSlice } from './cardSlice';
import { commentsSlice } from './commentSlice';
import { columnsSlice } from './columnsSlice';

export const reducer = combineReducers({
  cards: cardsSlice.reducer,
  columns: columnsSlice.reducer,
  comments: commentsSlice.reducer,
  user: userSlice.reducer,
});
