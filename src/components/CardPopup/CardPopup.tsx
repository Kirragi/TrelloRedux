import React from 'react';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import crossIcon from '../assets/img/cross.png';
import Comment from '../Comment';
import { CardType, State } from '../../type';
import { Form, Field } from 'react-final-form';
import {
  changeCardTheme,
  changeCardText,
  chengeStatusText,
  chengeStatusTheme,
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
  ThemeText,
  ThemeWrapper,
  ImgTheme,
  ImgText,
  ButtonChenge,
  InputTheme,
  ButtonTheme,
  Textarea,
  ButtonText,
  InputComment,
  ButtonComment,
  CommentWrapper,
} from './cardPopupStyling';

function CardPopup(props: { card: CardType }) {
  const user = useSelector((state: State) => state.user);
  const columnState = useSelector((state: State) => state.columns);
  const comment = useSelector((state: State) => state.comments);
  const dispatch = useDispatch();
  const card: CardType = props.card;
  let nameColumn = '' as string;
  columnState.map((item) => {
    if (props.card.columnID === item.idColumn) {
      nameColumn = item.nameColumn;
    }
  });

  function closePopup() {
    dispatch(closePopupCard());
    dispatch(clearChengeComment());
    dispatch(clearChengeCard());
  }

  const comments = comment.map((itemComent) => {
    if (itemComent.idCards === card.id) {
      return (
        <CommentWrapper key={itemComent.idComments}>
          <Comment comment={itemComent} />
        </CommentWrapper>
      );
    }
  });

  let themeCard: JSX.Element;
  if (card.statusTheme === false) {
    themeCard = (
      <ThemeWrapper>
        <ThemeText>{props.card.theme}</ThemeText>
        <ButtonChenge
          onClick={() => dispatch(chengeStatusTheme({ cardId: card.id }))}>
          <ImgTheme src={ChengeIcon} alt="" />
        </ButtonChenge>
      </ThemeWrapper>
    );
  } else {
    themeCard = (
      <div>
        <Form
          onSubmit={(formObj: { newTheme: string }) => {
            if (formObj.newTheme) {
              if (formObj.newTheme.trim()) {
                dispatch(
                  changeCardTheme({
                    cardId: card.id,
                    theme: formObj.newTheme,
                  }),
                );
                dispatch(clearChengeCard());
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newTheme" defaultValue={card.theme}>
                {({ input }) => <InputTheme type="text" {...input} />}
              </Field>
              <ButtonTheme>Изменить</ButtonTheme>
            </form>
          )}
        </Form>
      </div>
    );
  }

  let textCard: JSX.Element;
  if (card.statusText === false) {
    textCard = (
      <div>
        <span>{card.text}</span>
        <ButtonChenge
          onClick={() => dispatch(chengeStatusText({ cardId: card.id }))}>
          <ImgText src={ChengeIcon} alt="" />
        </ButtonChenge>
      </div>
    );
  } else {
    textCard = (
      <div>
        <Form
          onSubmit={(formObj: { newText: string }) => {
            if (formObj.newText) {
              if (formObj.newText.trim()) {
                dispatch(
                  changeCardText({
                    cardId: card.id,
                    text: formObj.newText,
                  }),
                );
                dispatch(clearChengeCard());
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newText" defaultValue={card.text}>
                {({ input }) => <Textarea {...input} />}
              </Field>
              <ButtonText>Изменить</ButtonText>
            </form>
          )}
        </Form>
      </div>
    );
  }

  let popup: JSX.Element;

  if (card.statusPopup === true) {
    popup = (
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
            {themeCard}
            <p>Автор: {card.author}</p>
            {textCard}
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
            {comments}
          </ContentPopup>{' '}
        </WrapperPopup>
      </div>
    );
  } else {
    popup = <></>;
  }
  return popup;
}
export default CardPopup;
