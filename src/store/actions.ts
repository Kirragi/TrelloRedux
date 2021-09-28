import { commentsSlice } from './commentSlice';
import { userSlice } from './userSlice';
import { columnsSlice } from './columnsSlice';
import { cardsSlice } from './cardSlice';

export const {
  create: createComment,
  onDelete: onCommentDelete,
  changeText: changeCommentText,
  chengeStatusComment: chengeStatusComment,
  clearChengeComment: clearChengeComment,
} = commentsSlice.actions;

export const {
  onCardChecked: onCardChecked,
  onCardDelete: onCardDelete,
  create: createCard,
  changeTheme: changeCardTheme,
  changeText: changeCardText,
  openPopupCard: openPopupCard,
  closePopupCard: closePopupCard,
  chengeStatusTheme: chengeStatusTheme,
  chengeStatusText: chengeStatusText,
  clearChengeCard: clearChengeCard,
} = cardsSlice.actions;

export const {
  statusChengeColumn: statusChengeColumn,
  closeChengeColumn: closeChengeColumn,
  changeColumnName: changeColumnName,
  openAddPopup: openAddPopup,
  closeAddPopup: closeAddPopup,
} = columnsSlice.actions;

export const { setUser: setUser } = userSlice.actions;
