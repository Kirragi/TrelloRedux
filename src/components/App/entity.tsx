export type NameType = {
  status: boolean;
  name: string;
};
export type CardType = {
  theme: string;
  author: string;
  text: string;
  checked: boolean;
  columnID: number;
  id: number;
};
export type ColumnType = {
  nameColumn: string;
  indexColumn: number;
};
export type CommentType = {
  idCards: number;
  idComments: number;
  authorComments: string;
  commentText: string;
};
export type CreateActiveType = {
  status: boolean;
  createIndex: number;
};
export type PopupCardType = {
  status: boolean;
  cardIndex: number;
};
export interface CardPopupProps {
  dataCards: CardType[];
  dataColumn: ColumnType[];
  comments: CommentType[];
  popupCard: PopupCardType[];
  chengeTheme: boolean;
  chengeText: boolean;
  setPopupCard(popupCard: PopupCardType[]): void;
  addComments(comment: string, idCards: number): void;
  onDeleteCommets(id: number): void;
  newThemeCard(name: string, id: number): void;
  newTextCard(text: string, id: number): void;
  newTextComment(text: string, id: number): void;
  setChengeTheme(chengeTheme: boolean): void;
  setChengeText(chengeText: boolean): void;
}
export interface CardProps {
  cards: CardType[];
  card: CardType;
  onDelete(id: number): void;
  onToggleChecked(id: number): void;
  setPopupCard(popupCard: PopupCardType[]): void;
  comments: CommentType[];
}
export interface ColumnProps {
  dataCards: CardType[];
  dataColumn: ColumnType[];
  active: CreateActiveType[];
  setColumn(column: ColumnType[]): void;
  setActive(active: CreateActiveType[]): void;
  setPopupCard(popupCard: PopupCardType[]): void;
  comments: CommentType[];
  onDelete(id: number): void;
  onToggleChecked(id: number): void;
  newNameColumn(name: string, id: number): void;
}
export interface CreateCardsProps {
  active: CreateActiveType[];
  setActive(active: CreateActiveType[]): void;
  addCard(theme: string, text: string, columnID: number): void;
  setPopupCard(popupCard: PopupCardType[]): void;
}
export interface NameProps {
  name: NameType[];
  setName(name: NameType[]): void;
}
export interface CommentProps {
  comment: CommentType;
  newTextComment(text: string, id: number): void;
  onDeleteCommets(id: number): void;
  idCommentChenge: number;
  setIdCommentChenge(idCommentChenge: number): void;
}
