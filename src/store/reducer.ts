import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { CardType, ColumnType, CommentType, OpenCards, User } from '../type';

const cardsInitialState: CardType[] = [
  {
    theme: 'Lorem Ipsum',
    author: 'Andre',
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    checked: false,
    columnID: 1,
    id: 1,
  },
];
const columnsInitialState: ColumnType[] = [
  { nameColumn: 'ToDoo', indexColumn: 1 },
  { nameColumn: 'In Progress', indexColumn: 2 },
  { nameColumn: 'Testing', indexColumn: 3 },
  { nameColumn: 'Done', indexColumn: 4 },
];
const commentsInitialState: CommentType[] = [
  {
    idComments: 1,
    idCards: 1,
    authorComments: 'Andre',
    commentText:
      'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем .',
  },
];
const userInitialState: User = '';

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ userName: User }>) => {
      if (payload.userName !== state) {
        return payload.userName;
      }
    },
  },
});

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsInitialState,
  reducers: {
    changeTitle: (
      state,
      { payload }: PayloadAction<{ columnId: number; newName: string }>,
    ) => {
      if (payload.newName.trim()) {
        const newArr = state.map((column) => {
          if (column.indexColumn === payload.columnId) {
            return { ...column, nameColumn: payload.newName };
          }
          return column;
        });
        return newArr;
      }
    },
  },
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsInitialState,
  reducers: {
    create: (
      state,
      {
        payload,
      }: PayloadAction<{
        theme: string;
        text: string;
        columnID: number;
        author: string;
      }>,
    ) => {
      if (payload.theme.trim() && payload.text.trim()) {
        let newId = 0;
        let success = false;
        const cardsId = [];

        for (let i = 0; i < state.length; i++) {
          cardsId.push(state[i].id);
        }

        while (!success) {
          if (cardsId.indexOf(newId) !== -1) {
            newId++;
          } else {
            success = true;
          }
        }
        const card = {
          id: newId,
          theme: payload.theme,
          text: payload.text,
          checked: false,
          author: payload.author,
          columnID: payload.columnID,
        };
        const newCards = [...state, card];
        return newCards;
      }
    },
    onCardChecked: (state, { payload }: PayloadAction<{ Id: number }>) => {
      const newArr = state.map((item) => {
        if (item.id === payload.Id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return newArr;
    },
    onCardDelete: (state, { payload }: PayloadAction<{ cardId: number }>) => {
      let newArr = state.filter((elem) => {
        return elem.id !== payload.cardId;
      });
      return newArr;
    },
    changeTheme: (
      state,
      { payload }: PayloadAction<{ cardId: number; theme: string }>,
    ) => {
      if (payload.theme.trim()) {
        const newArr = state.map((card) => {
          if (card.id === payload.cardId) {
            console.log(123123);
            return { ...card, theme: payload.theme };
          }
          return card;
        });
        return newArr;
      }
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ cardId: number; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const newArr = state.map((card) => {
          if (card.id === payload.cardId) {
            return { ...card, text: payload.text };
          }
          return card;
        });
        return newArr;
      }
    },
  },
});

export const showCardSlice = createSlice({
  name: 'showCard',
  initialState: -1,
  reducers: {
    setNewCard: (state, { payload }: PayloadAction<{ cardId: OpenCards }>) => {
      return payload.cardId;
    },
    clearId: () => {
      return -1;
    },
  },
});

export const addPopupSlice = createSlice({
  name: 'addPopup',
  initialState: -1,
  reducers: {
    openAddPopup: (state, { payload }: PayloadAction<{ columnId: number }>) => {
      return payload.columnId;
    },
    closeAddPopup: () => {
      return -1;
    },
  },
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {
    create: (
      state,
      {
        payload,
      }: PayloadAction<{ cardId: number; author: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        let idComment = 0;
        let success = false;
        const commentsId = [];

        for (let comment of state) {
          commentsId.push(comment.idComments);
        }
        while (!success) {
          if (commentsId.indexOf(idComment) !== -1) {
            idComment++;
          } else {
            success = true;
          }
        }

        const comment = {
          idComments: idComment,
          idCards: payload.cardId,
          authorComments: payload.author,
          commentText: payload.text,
        };

        const newArr = [...state, comment];
        return newArr;
      }
    },
    onDelete: (state, { payload }: PayloadAction<{ ids: number[] }>) => {
      const filteredComments = state.filter((comment) => {
        return !payload.ids.includes(comment.idComments);
      });
      return filteredComments;
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ id: number; text: string }>,
    ) => {
      if (payload.text.trim()) {
        state.map((comment) => {
          if (comment.idComments === payload.id) {
            comment.commentText = payload.text;
          }
          return comment;
        });
      }
    },
  },
  extraReducers: {
    [cardsSlice.actions.onCardDelete.type]: (
      state,
      { payload }: PayloadAction<{ cardId: number }>,
    ) => {
      const filteredComments = state.filter((comment) => {
        return payload.cardId !== comment.idCards;
      });
      return filteredComments;
    },
  },
});

export const chengeThemeSlice = createSlice({
  name: 'chengeTheme',
  initialState: false,
  reducers: {
    chengeTheme: () => {
      return true;
    },
    clearChengeTheme: () => {
      return false;
    },
  },
});

export const chengeTextSlice = createSlice({
  name: 'chengeText',
  initialState: false,
  reducers: {
    chengeText: () => {
      return true;
    },
    clearChengeText: () => {
      return false;
    },
  },
});

export const reducer = combineReducers({
  cards: cardsSlice.reducer,
  columns: columnsSlice.reducer,
  comments: commentsSlice.reducer,
  user: userSlice.reducer,
  showCard: showCardSlice.reducer,
  addPopup: addPopupSlice.reducer,
  chengeText: chengeTextSlice.reducer,
  chengeTheme: chengeThemeSlice.reducer,
});
