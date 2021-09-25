import React, { useState } from 'react';
import trashIcon from '../assets/img/trash.png';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { CommentProps } from '../../type';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {
  onCommentDeleteActionCreator,
  changeCommentTextActionCreator,
} from '../../store/actions';
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
  const [chenge, setChenge] = useState(false);
  const dispatch = useDispatch();
  let statusComment: JSX.Element;
  function openChenge() {
    setChenge(true);
    props.setIdCommentChenge(props.comment.idComments);
  }

  if (chenge && props.idCommentChenge === props.comment.idComments) {
    statusComment = (
      <div>
        <Form
          onSubmit={(formObj: { newText: string }) => {
            if (formObj.newText) {
              if (formObj.newText.trim()) {
                dispatch(
                  changeCommentTextActionCreator({
                    id: props.comment.idComments,
                    text: formObj.newText,
                  }),
                );
                setChenge(false);
                props.setIdCommentChenge(-1);
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newText" defaultValue={props.comment.commentText}>
                {({ input }) => <InputComment type="text" {...input} />}
              </Field>
              <ButtonComment>Изменить</ButtonComment>
            </form>
          )}
        </Form>
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
          onClick={() =>
            dispatch(
              onCommentDeleteActionCreator({ ids: [props.comment.idComments] }),
            )
          }>
          <ImgTheme src={trashIcon} alt="" />
        </ButtonTrash>
      </CommentHeader>
      {statusComment}
    </div>
  );
}
export default Comment;
