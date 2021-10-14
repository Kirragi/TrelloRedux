import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import crossIcon from '../assets/img/cross.png';
import Comment from '../Comment';
import { CardType } from '../../type';
import { slelectColumns } from '../../store/columnsSlice';
import { selectCommentsCard } from '../../store/commentSlice';
import { slelectUser } from '../../store/userSlice';
import TitlePopup from './TitlePopup';
import MessagePopup from './MessagePopup';
import { Form, Field } from 'react-final-form';
import {
  clearChengeCard,
  clearChengeComment,
  closePopupCard,
  createComment,
} from '../../store/actions';
import {
  WrapperPopup,
  HeaderPopup,
  ContentPopup,
  ButtonCross,
  ImgCross,
  InputComment,
  ButtonComment,
  CommentWrapper,
} from './cardPopupStyling';

function CardPopup(props: { card: CardType }) {
  const card: CardType = props.card;
  const user = useSelector(slelectUser);
  const columns = useSelector(slelectColumns);
  const comments = useSelector(selectCommentsCard(card.id));
  const dispatch = useDispatch();
  const nameColumn = columns.find((column) => column.id === props.card.idColumn)
    ?.nameColumn as string;

  function closePopup() {
    dispatch(closePopupCard());
    dispatch(clearChengeComment());
    dispatch(clearChengeCard());
  }

  const commentList = comments.map((comment) => {
    return (
      <CommentWrapper key={comment.id}>
        <Comment comment={comment} />
      </CommentWrapper>
    );
  });

  if (card.statusPopup === true) {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <WrapperPopup onClick={() => closePopup()}>
          <ContentPopup
            className="card__popup__content"
            onClick={(e) => e.stopPropagation()}>
            <HeaderPopup>
              <span>Колонка: {nameColumn}</span>
              <ButtonCross onClick={() => closePopup()}>
                <ImgCross src={crossIcon} alt="" />
              </ButtonCross>
            </HeaderPopup>
            <TitlePopup card={card} />
            <p>Автор: {card.author}</p>
            <MessagePopup card={card} />
            <Form
              onSubmit={(formObj: { newComment: string }) => {
                if (formObj.newComment) {
                  if (formObj.newComment.trim()) {
                    dispatch(
                      createComment({
                        cardId: card.id,
                        author: user,
                        text: formObj.newComment,
                      }),
                    );
                    formObj.newComment = '';
                  }
                }
              }}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <p>Добавление комментария</p>
                  <Field name="newComment">
                    {({ input }) => (
                      <InputComment
                        type="text"
                        placeholder="Ваш комментарий"
                        {...input}
                      />
                    )}
                  </Field>
                  <ButtonComment>Добавить</ButtonComment>
                </form>
              )}
            </Form>
            <p>Комментарии</p>
            {commentList}
          </ContentPopup>{' '}
        </WrapperPopup>
      </div>
    );
  }
  return <></>;
}
export default CardPopup;
