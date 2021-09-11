import React, { useState } from 'react';
import trashIcon from '../assets/img/trash.png';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { CommentProps } from '../App/entity';
import {
  ImgTheme,
  ImgText,
  ButtonChenge,
  InputComment,
  ButtonComment,
  ButtonTrash,
  CommentHeader,
} from './commentStyling';
function Comment(props: CommentProps) {
  const [valueComment, setValueComment] = useState('');
  const [chenge, setChenge] = useState(false);
  let statusComment: JSX.Element;
  function onValueComment(e: React.FormEvent<HTMLInputElement>): void {
    setValueComment(e.currentTarget.value);
  }

  function newText() {
    props.newTextComment(valueComment, props.comment.idComments);
    setChenge(false);
    props.setIdCommentChenge(-1);
  }

  function openChenge() {
    setChenge(true);
    props.setIdCommentChenge(props.comment.idComments);
  }

  if (chenge && props.idCommentChenge === props.comment.idComments) {
    statusComment = (
      <div>
        <InputComment
          type="text"
          defaultValue={props.comment.commentText}
          onChange={onValueComment}
        />
        <ButtonComment onClick={() => newText()}>Изменить</ButtonComment>
      </div>
    );
  } else {
    statusComment = (
      <div>
        <span>{props.comment.commentText}</span>
        <ButtonChenge onClick={() => openChenge()}>
          <ImgText src={ChengeIcon} alt="" />
        </ButtonChenge>
      </div>
    );
  }

  return (
    <div>
      <CommentHeader>
        <p>Автор: {props.comment.authorComments}</p>
        <ButtonTrash
          onClick={() => props.onDeleteCommets(props.comment.idComments)}>
          <ImgTheme src={trashIcon} alt="" />
        </ButtonTrash>
      </CommentHeader>
      {statusComment}
    </div>
  );
}
export default Comment;
