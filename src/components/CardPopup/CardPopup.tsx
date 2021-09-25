import React, { useState } from 'react';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import crossIcon from '../assets/img/cross.png';
import Comment from '../Comment';
import { CardType, State } from '../../type';
import { Form, Field } from 'react-final-form';
import {
  clearShowCardIdActionCreator,
  createCommentdActionCreator,
  changeCardTitleActionCreator,
  changeCardTextActionCreator,
  clearChengeThemeActionCreator,
  clearChengeTextActionCreator,
  chengeTextActionCreator,
  chengeThemeActionCreator,
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

function CardPopup() {
  const [idCommentChenge, setIdCommentChenge] = useState(-1);
  const cardState = useSelector((state: State) => state.cards);
  const statusCard = useSelector((state: State) => state.showCard);
  const user = useSelector((state: State) => state.user);
  const columnState = useSelector((state: State) => state.columns);
  const comment = useSelector((state: State) => state.comments);
  const chengeTheme = useSelector((state: State) => state.chengeTheme);
  const chengeText = useSelector((state: State) => state.chengeText);
  const dispatch = useDispatch();
  let nameColumn = '' as string;
  let dataPopup = cardState.find((item) => statusCard === item.id);

  if (dataPopup !== undefined) {
    columnState.find((item) => item.indexColumn === dataPopup?.columnID);
  }
  function switchTheme() {
    dispatch(chengeThemeActionCreator());
    dispatch(clearChengeTextActionCreator());
  }

  function switchText() {
    dispatch(chengeTextActionCreator());
    dispatch(clearChengeThemeActionCreator());
  }

  function closePopup() {
    dispatch(clearChengeThemeActionCreator());
    dispatch(clearChengeTextActionCreator());
    dispatch(clearShowCardIdActionCreator());
  }

  const comments = comment.map((itemComent) => {
    if (itemComent.idCards === statusCard) {
      return (
        <CommentWrapper key={itemComent.idComments}>
          <Comment
            comment={itemComent}
            idCommentChenge={idCommentChenge}
            setIdCommentChenge={setIdCommentChenge}
          />
        </CommentWrapper>
      );
    }
  });

  let statusTheme: JSX.Element;
  if (chengeTheme === false) {
    statusTheme = (
      <ThemeWrapper>
        <ThemeText>{dataPopup?.theme}</ThemeText>
        <ButtonChenge onClick={() => switchTheme()}>
          <ImgTheme src={ChengeIcon} alt="" />
        </ButtonChenge>
      </ThemeWrapper>
    );
  } else {
    statusTheme = (
      <div>
        <Form
          onSubmit={(formObj: { newTheme: string }) => {
            if (formObj.newTheme) {
              if (formObj.newTheme.trim()) {
                dispatch(
                  changeCardTitleActionCreator({
                    cardId: statusCard,
                    theme: formObj.newTheme,
                  }),
                );
                dispatch(clearChengeThemeActionCreator());
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newTheme" defaultValue={dataPopup?.theme}>
                {({ input }) => <InputTheme type="text" {...input} />}
              </Field>
              <ButtonTheme>Изменить</ButtonTheme>
            </form>
          )}
        </Form>
      </div>
    );
  }

  let statusText: JSX.Element;
  if (chengeText === false) {
    statusText = (
      <div>
        <span>{dataPopup?.text}</span>
        <ButtonChenge onClick={() => switchText()}>
          <ImgText src={ChengeIcon} alt="" />
        </ButtonChenge>
      </div>
    );
  } else {
    statusText = (
      <div>
        <Form
          onSubmit={(formObj: { newText: string }) => {
            if (formObj.newText) {
              if (formObj.newText.trim()) {
                dispatch(
                  changeCardTextActionCreator({
                    cardId: statusCard,
                    text: formObj.newText,
                  }),
                );
                dispatch(clearChengeTextActionCreator());
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="newText" defaultValue={dataPopup?.text}>
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
  if (statusCard !== -1) {
    popup = (
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
          {statusTheme}
          <p>Автор: {dataPopup?.author}</p>
          {statusText}
          <Form
            onSubmit={(formObj: { newComment: string }) => {
              if (formObj.newComment) {
                if (formObj.newComment.trim()) {
                  dispatch(
                    createCommentdActionCreator({
                      cardId: statusCard,
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
        </ContentPopup>
      </WrapperPopup>
    );
  } else {
    popup = <div></div>;
  }

  return (
    <div>
      <div> {popup}</div>
    </div>
  );
}
export default CardPopup;
