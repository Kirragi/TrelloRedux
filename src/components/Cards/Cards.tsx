import React from 'react';
import trashIcon from '../assets/img/trash.png';
import openIcon from '../assets/img/open.png';
import closeIcon from '../assets/img/close.png';
import { CardProps, State } from '../../type';
import { useSelector, useDispatch } from 'react-redux';
import {
  onCardDeleteActionCreator,
  onCardCheckedActionCreator,
  setNewCardIdActionCreator,
} from '../../store/actions';
import {
  CardWraper,
  ButtonCards,
  ImgCards,
  ButtonWraper,
  ThemeColumn,
  FooterCard,
} from './cardsStyling';

function Cards(props: CardProps) {
  const dispatch = useDispatch();
  const statusCards = useSelector((state: State) => state.showCard);
  const comments = useSelector((state: State) => state.comments);
  let checedIcons: JSX.Element;

  if (props.card.checked) {
    checedIcons = <ImgCards src={openIcon} alt="checked" />;
  } else {
    checedIcons = <ImgCards src={closeIcon} alt="checked" />;
  }

  function openPopup() {
    dispatch(
      setNewCardIdActionCreator({
        cardId: props.card.id,
      }),
    );
    console.log(statusCards);
  }

  const colComment = [0];
  comments.map((item) => {
    if (item.idCards === props.card.id) {
      colComment[0] += 1;
    }
  });

  return (
    <CardWraper onClick={() => openPopup()}>
      <div className="card__info-wrapper">
        <ThemeColumn>{props.card.theme}</ThemeColumn>
        <p className="card__autor">Автор: {props.card.author}</p>
        <div className="card__text-wrapper">
          <span className="card__text">{props.card.text}</span>
        </div>
      </div>
      <FooterCard>
        <p>Комментарии:{colComment}</p>
        <ButtonWraper>
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonCards
              onClick={() =>
                dispatch(onCardCheckedActionCreator({ Id: props.card.id }))
              }>
              {checedIcons}
            </ButtonCards>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonCards
              onClick={() =>
                dispatch(onCardDeleteActionCreator({ cardId: props.card.id }))
              }>
              <ImgCards src={trashIcon} alt="trash" />
            </ButtonCards>
          </div>
        </ButtonWraper>
      </FooterCard>
    </CardWraper>
  );
}
export default Cards;
