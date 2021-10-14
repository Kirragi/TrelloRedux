export type CardType = {
  theme: string;
  author: string;
  text: string;
  checked: boolean;
  idColumn: number;
  id: string;
  statusPopup: boolean;
  statusText: boolean;
  statusTheme: boolean;
};
export type ColumnType = {
  nameColumn: string;
  id: number;
  statusAddPopup: boolean;
  statusChenge: boolean;
};
export type CommentType = {
  id: string;
  idCards: string;
  authorComments: string;
  commentText: string;
  statusChengeComment: boolean;
};

export type State = {
  user: string;
  uesers: number;
  columns: ColumnType[];
  cards: CardType[];
  comments: CommentType[];
};
