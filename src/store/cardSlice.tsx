import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '../type';
import { uuidv4 } from './generateUUID';
const cardsInitialState: CardType[] = [
  {
    id: 'jnfejbf',
    theme: 'Lorem Ipsum',
    author: 'Andre',
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    columnID: 1,
    checked: false,
    statusPopup: false,
    statusText: false,
    statusTheme: false,
  },
];

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
        const card = {
          id: uuidv4(),
          theme: payload.theme,
          text: payload.text,
          checked: false,
          author: payload.author,
          columnID: payload.columnID,
          statusPopup: false,
          statusText: false,
          statusTheme: false,
        };
        const newCards = [...state, card];
        return newCards;
      }
    },
    onCardChecked: (state, { payload }: PayloadAction<{ Id: string }>) => {
      const newArr = state.map((item) => {
        if (item.id === payload.Id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return newArr;
    },
    onCardDelete: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      let newArr = state.filter((elem) => {
        return elem.id !== payload.cardId;
      });
      return newArr;
    },
    changeTheme: (
      state,
      { payload }: PayloadAction<{ cardId: string; theme: string }>,
    ) => {
      if (payload.theme.trim()) {
        const newArr = state.map((card) => {
          if (card.id === payload.cardId) {
            return { ...card, theme: payload.theme };
          }
          return card;
        });
        return newArr;
      }
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ cardId: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const newArrUsers = state.map((card) => {
          if (card.id === payload.cardId) {
            return { ...card, text: payload.text };
          }
          return card;
        });
        return newArrUsers;
      }
    },
    openPopupCard: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      const newArrUsers = state.map((card) => {
        if (card.id === payload.cardId) {
          return { ...card, statusPopup: true };
        }
        return card;
      });
      return newArrUsers;
    },
    closePopupCard: (state) => {
      const newArrUsers = state.map((card) => {
        return { ...card, statusPopup: false };
      });
      return newArrUsers;
    },
    chengeStatusTheme: (
      state,
      { payload }: PayloadAction<{ cardId: string }>,
    ) => {
      const newArrUsers = state.map((card) => {
        if (card.id === payload.cardId) {
          return { ...card, statusText: false, statusTheme: true };
        }
        return card;
      });
      return newArrUsers;
    },
    chengeStatusText: (
      state,
      { payload }: PayloadAction<{ cardId: string }>,
    ) => {
      const newArrUsers = state.map((card) => {
        if (card.id === payload.cardId) {
          return { ...card, statusText: true, statusTheme: false };
        }
        return card;
      });
      return newArrUsers;
    },
    clearChengeCard: (state) => {
      const newArrUsers = state.map((card) => {
        return { ...card, statusText: false, statusTheme: false };
      });
      return newArrUsers;
    },
  },
});
