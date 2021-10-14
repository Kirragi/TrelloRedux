import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType, State } from '../type';
import { cardsSlice } from './cardSlice';
import { uuidv4 } from './generateUUID';
import { createSelector } from 'reselect';
const commentsInitialState: CommentType[] = [
  {
    id: 'hdfsjh3',
    idCards: 'jnfejbf',
    authorComments: 'Andre',
    statusChengeComment: false,
    commentText:
      'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем .',
  },
];

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {
    create: (
      state,
      {
        payload,
      }: PayloadAction<{ cardId: string; author: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const comment = {
          id: uuidv4(),
          idCards: payload.cardId,
          authorComments: payload.author,
          commentText: payload.text,
          statusChengeComment: false,
        };

        const newArrComment = [...state, comment];
        return newArrComment;
      }
    },
    onDelete: (state, { payload }: PayloadAction<{ id: string }>) => {
      const filteredComments = state.filter((comment) => {
        return !payload.id.includes(comment.id);
      });
      return filteredComments;
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ id: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        state.map((comment) => {
          if (comment.id === payload.id) {
            comment.commentText = payload.text;
          }
          return comment;
        });
      }
    },
    chengeStatusComment: (
      state,
      { payload }: PayloadAction<{ id: string }>,
    ) => {
      const newArrComment = state.map((comment) => {
        if (comment.id === payload.id) {
          return { ...comment, statusChengeComment: true };
        }
        return comment;
      });
      return newArrComment;
    },
    clearChengeComment: (state) => {
      const newArrComment = state.map((comment) => {
        return { ...comment, statusChengeComment: false };
      });
      return newArrComment;
    },
  },
  extraReducers: {
    [cardsSlice.actions.onCardDelete.type]: (
      state,
      { payload }: PayloadAction<{ cardId: string }>,
    ) => {
      const filteredComments = state.filter((comment) => {
        return payload.cardId !== comment.idCards;
      });
      return filteredComments;
    },
  },
});

export function selectCommentsCard(idCard: string) {
  const selector = createSelector(
    (state: State) => state.comments,
    (comments) => comments.filter((comment) => comment.idCards === idCard),
  );
  return selector;
}
