import {
  userSlice,
  columnsSlice,
  cardsSlice,
  commentsSlice,
  showCardSlice,
  addPopupSlice,
  chengeThemeSlice,
  chengeTextSlice,
} from './reducer';

export const {
  setNewCard: setNewCardIdActionCreator,
  clearId: clearShowCardIdActionCreator,
} = showCardSlice.actions;

export const {
  openAddPopup: openAddPopupActionCreator,
  closeAddPopup: closeAddPopupActionCreator,
} = addPopupSlice.actions;

export const {
  create: createCommentdActionCreator,
  onDelete: onCommentDeleteActionCreator,
  changeText: changeCommentTextActionCreator,
} = commentsSlice.actions;

export const {
  onCardChecked: onCardCheckedActionCreator,
  onCardDelete: onCardDeleteActionCreator,
  create: createCardActionCreator,
  changeTheme: changeCardTitleActionCreator,
  changeText: changeCardTextActionCreator,
} = cardsSlice.actions;

export const {
  chengeTheme: chengeThemeActionCreator,
  clearChengeTheme: clearChengeThemeActionCreator,
} = chengeThemeSlice.actions;

export const {
  chengeText: chengeTextActionCreator,
  clearChengeText: clearChengeTextActionCreator,
} = chengeTextSlice.actions;

export const { changeTitle: changeColumnTitleActionCreator } =
  columnsSlice.actions;

export const { setUser: setUserActionCreator } = userSlice.actions;
