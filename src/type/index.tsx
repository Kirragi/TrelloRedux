export type CardType = {
  theme: string;
  author: string;
  text: string;
  checked: boolean;
  columnID: number;
  id: string;
  statusPopup: boolean;
  statusText: boolean;
  statusTheme: boolean;
};
export type ColumnType = {
  nameColumn: string;
  idColumn: number;
  statusAddPopup: boolean;
  statusChenge: boolean;
};
export type CommentType = {
  idCards: string;
  idComments: string;
  authorComments: string;
  commentText: string;
  statusChengeComment: boolean;
};

export type State = {
  user: string;
  columns: ColumnType[];
  cards: CardType[];
  comments: CommentType[];
};
