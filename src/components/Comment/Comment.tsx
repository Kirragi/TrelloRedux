import React from 'react';
import trashIcon from '../assets/img/trash.png';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { CommentType } from '../../type';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {
  onCommentDelete,
  changeCommentText,
  chengeStatusComment,
  clearChengeComment,
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
function Comment(props: { comment: CommentType }) {
  const comment = props.comment;
  const dispatch = useDispatch();
  function changeStatus() {
    dispatch(clearChengeComment());
    dispatch(chengeStatusComment({ commentId: comment.idComments }));
  }

  let statusComment: JSX.Element;
  if (comment.statusChengeComment === true) {
    statusComment = (
      <div>
        <Form
          onSubmit={(formObj: { newText: string }) => {
            if (formObj.newText) {
              if (formObj.newText.trim()) {
                dispatch(
                  changeCommentText({
                    id: props.comment.idComments,
                    text: formObj.newText,
                  }),
                );
                dispatch(clearChengeComment());
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
        <ButtonChenge onClick={() => changeStatus()}>
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
            dispatch(onCommentDelete({ ids: props.comment.idComments }))
          }>
          <ImgTheme src={trashIcon} alt="" />
        </ButtonTrash>
      </CommentHeader>
      {statusComment}
    </div>
  );
}
export default Comment;
