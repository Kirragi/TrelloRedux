import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType, State } from '../type';
import { createSelector } from 'reselect';
import { uuidv4 } from './generateUUID';
const cardsInitialState: CardType[] = [
  {
    id: 'jnfejbf',
    theme: 'Lorem Ipsum',
    author: 'Andre',
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    idColumn: 1,
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
        idColumn: number;
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
          idColumn: payload.idColumn,
          statusPopup: false,
          statusText: false,
          statusTheme: false,
        };
        const newCards = [...state, card];
        return newCards;
      }
    },
    onCardChecked: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newArrCards = state.map((card) => {
        if (card.id === payload.id) {
          return { ...card, checked: !card.checked };
        }
        return card;
      });
      return newArrCards;
    },
    onCardDelete: (state, { payload }: PayloadAction<{ id: string }>) => {
      let newArrCards = state.filter((card) => {
        return card.id !== payload.id;
      });
      return newArrCards;
    },
    changeTheme: (
      state,
      { payload }: PayloadAction<{ id: string; theme: string }>,
    ) => {
      if (payload.theme.trim()) {
        const newArrCards = state.map((card) => {
          if (card.id === payload.id) {
            return { ...card, theme: payload.theme };
          }
          return card;
        });
        return newArrCards;
      }
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ id: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const newArrCards = state.map((card) => {
          if (card.id === payload.id) {
            return { ...card, text: payload.text };
          }
          return card;
        });
        return newArrCards;
      }
    },
    openPopupCard: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newArrCards = state.map((card) => {
        if (card.id === payload.id) {
          return { ...card, statusPopup: true };
        }
        return card;
      });
      return newArrCards;
    },
    closePopupCard: (state) => {
      const newArrCards = state.map((card) => {
        return { ...card, statusPopup: false };
      });
      return newArrCards;
    },
    chengeStatusTheme: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newArrCards = state.map((card) => {
        if (card.id === payload.id) {
          return { ...card, statusText: false, statusTheme: true };
        }
        return card;
      });
      return newArrCards;
    },
    chengeStatusText: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newArrCards = state.map((card) => {
        if (card.id === payload.id) {
          return { ...card, statusText: true, statusTheme: false };
        }
        return card;
      });
      return newArrCards;
    },
    clearChengeCard: (state) => {
      const newArrCards = state.map((card) => {
        return { ...card, statusText: false, statusTheme: false };
      });
      return newArrCards;
    },
  },
});

export function slelectCard(idColumn: number) {
  const selector = createSelector(
    (state: State) => state.cards,
    (cards) => cards.filter((card) => card.idColumn === idColumn),
  );
  return selector;
}
