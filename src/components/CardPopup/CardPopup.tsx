import React, { useState } from 'react';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import crossIcon from '../assets/img/cross.png';
import Comment from '../Comment';
import { CardPopupProps, CardType } from '../App/entity';
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

function CardPopup(props: CardPopupProps) {
  const [inputComent, setInputComent] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newText, setNewText] = useState('');
  const [idCommentChenge, setIdCommentChenge] = useState(-1);

  function onInputComent(e: React.FormEvent<HTMLInputElement>): void {
    setInputComent(e.currentTarget.value);
  }

  function onNewText(e: React.FormEvent<HTMLTextAreaElement>): void {
    setNewText(e.currentTarget.value);
  }

  function onNewTheme(e: React.FormEvent<HTMLInputElement>): void {
    setNewTheme(e.currentTarget.value);
  }

  let dataPopup: CardType;
  dataPopup = {
    theme: 'Lorem Ipsum',
    author: 'Andre',
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    checked: false,
    columnID: 1,
    id: 1,
  };

  props.dataCards.map((item) => {
    if (props.popupCard[0].cardIndex === item.id) {
      dataPopup = item;
    }
  });

  let nameColumn = '' as string;
  props.dataColumn.map((item) => {
    if (item.indexColumn === dataPopup.columnID) {
      nameColumn = item.nameColumn;
    }
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputComent !== '') {
      props.addComments(inputComent, props.popupCard[0].cardIndex);
      setInputComent('');
    }
  }

  function switchTheme(value: string) {
    props.setChengeTheme(true);
    props.setChengeText(false);
    setNewTheme(value);
  }

  function switchText(value: string) {
    props.setChengeText(true);
    props.setChengeTheme(false);
    setNewText(value);
  }

  function closePopup() {
    props.setChengeText(false);
    props.setChengeTheme(false);
    props.setPopupCard([{ status: false, cardIndex: 0 }]);
  }

  function closeChengeText() {
    props.newTextCard(newText, dataPopup.id);
    props.setChengeText(false);
  }

  function closeChengeTheme() {
    props.newThemeCard(newTheme, dataPopup.id);
    props.setChengeTheme(false);
  }

  const comments = props.comments.map((itemComent) => {
    if (itemComent.idCards === props.popupCard[0].cardIndex) {
      return (
        <CommentWrapper key={itemComent.idComments}>
          <Comment
            comment={itemComent}
            newTextComment={props.newTextComment}
            onDeleteCommets={props.onDeleteCommets}
            idCommentChenge={idCommentChenge}
            setIdCommentChenge={setIdCommentChenge}
          />
        </CommentWrapper>
      );
    }
  });

  let statusTheme: JSX.Element;
  if (props.chengeTheme === false) {
    statusTheme = (
      <ThemeWrapper>
        <ThemeText>{dataPopup.theme}</ThemeText>
        <ButtonChenge onClick={() => switchTheme(dataPopup.theme)}>
          <ImgTheme src={ChengeIcon} alt="" />
        </ButtonChenge>
      </ThemeWrapper>
    );
  } else {
    statusTheme = (
      <div>
        <InputTheme
          type="text"
          defaultValue={dataPopup.theme}
          onChange={onNewTheme}
        />
        <ButtonTheme onClick={() => closeChengeTheme()}>Изменить</ButtonTheme>
      </div>
    );
  }

  let statusText: JSX.Element;
  if (props.chengeText === false) {
    statusText = (
      <div>
        <span>{dataPopup.text}</span>
        <ButtonChenge onClick={() => switchText(dataPopup.text)}>
          <ImgText src={ChengeIcon} alt="" />
        </ButtonChenge>
      </div>
    );
  } else {
    statusText = (
      <div>
        <Textarea defaultValue={dataPopup.text} onChange={onNewText} />
        <ButtonText onClick={() => closeChengeText()}>Изменить</ButtonText>
      </div>
    );
  }

  let popup: JSX.Element;
  if (props.popupCard[0].status) {
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
          <p>Автор: {dataPopup.author}</p>
          {statusText}
          <form onSubmit={onSubmit}>
            <p>Добавление комментария</p>
            <InputComment
              type="text"
              onChange={onInputComent}
              value={inputComent}
              placeholder="Ваш комментарий"
            />
            <ButtonComment>Добавить</ButtonComment>
          </form>
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
