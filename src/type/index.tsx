export type NameType = {
  status: boolean;
  name: string;
};
export type User = string;
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
export type OpenCards = number;

export type State = {
  user: User;
  columns: ColumnType[];
  cards: CardType[];
  showCard: OpenCards;
  comments: CommentType[];
  addPopup: number;
  chengeText: boolean;
  chengeTheme: boolean;
};

export interface CardProps {
  card: CardType;
}
export interface CommentProps {
  comment: CommentType;
  idCommentChenge: number;
  setIdCommentChenge(idCommentChenge: number): void;
}
