import React from 'react';
import trashIcon from '../assets/img/trash.png';
import openIcon from '../assets/img/open.png';
import closeIcon from '../assets/img/close.png';
import { CardType, State } from '../../type';
import { useSelector, useDispatch } from 'react-redux';
import CardPopup from '../CardPopup';
import {
  onCardDelete,
  onCardChecked,
  openPopupCard,
} from '../../store/actions';
import {
  CardWraper,
  ButtonCards,
  ImgCards,
  ButtonWraper,
  ThemeColumn,
  FooterCard,
} from './cardsStyling';

function Cards(props: { card: CardType }) {
  const dispatch = useDispatch();
  const comments = useSelector((state: State) => state.comments);
  let checedIcons: JSX.Element;

  if (props.card.checked) {
    checedIcons = <ImgCards src={openIcon} alt="checked" />;
  } else {
    checedIcons = <ImgCards src={closeIcon} alt="checked" />;
  }

  function openPopup() {
    dispatch(openPopupCard({ cardId: props.card.id }));
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
              onClick={() => dispatch(onCardChecked({ Id: props.card.id }))}>
              {checedIcons}
            </ButtonCards>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonCards
              onClick={() => dispatch(onCardDelete({ cardId: props.card.id }))}>
              <ImgCards src={trashIcon} alt="trash" />
            </ButtonCards>
          </div>
        </ButtonWraper>
      </FooterCard>
      <CardPopup card={props.card} />
    </CardWraper>
  );
}
export default Cards;
