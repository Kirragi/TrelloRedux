import React from 'react';
import trashIcon from '../assets/img/trash.png';
import openIcon from '../assets/img/open.png';
import closeIcon from '../assets/img/close.png';
import { CardType } from '../../type';
import { useSelector, useDispatch } from 'react-redux';
import CardPopup from '../CardPopup';
import {
  onCardDelete,
  onCardChecked,
  openPopupCard,
} from '../../store/actions';
import { selectCommentsCard } from '../../store/commentSlice';
import {
  CardWraper,
  ButtonCards,
  ImgCards,
  ButtonWraper,
  ThemeColumn,
  FooterCard,
} from './cardsStyling';

function Cards(props: { card: CardType }) {
  const card = props.card;
  const dispatch = useDispatch();
  const colComment = useSelector(selectCommentsCard(card.id)).length;

  return (
    <CardWraper onClick={() => dispatch(openPopupCard({ id: card.id }))}>
      <div className="card__info-wrapper">
        <ThemeColumn>{card.theme}</ThemeColumn>
        <p className="card__autor">Автор: {card.author}</p>
        <div className="card__text-wrapper">
          <span className="card__text">{card.text}</span>
        </div>
      </div>
      <FooterCard>
        <p>Комментарии:{colComment}</p>
        <ButtonWraper>
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonCards
              onClick={() => dispatch(onCardChecked({ id: card.id }))}>
              <ImgCards
                src={card.checked ? openIcon : closeIcon}
                alt="checked"
              />
            </ButtonCards>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonCards
              onClick={() => dispatch(onCardDelete({ id: card.id }))}>
              <ImgCards src={trashIcon} alt="trash" />
            </ButtonCards>
          </div>
        </ButtonWraper>
      </FooterCard>
      <CardPopup card={card} />
    </CardWraper>
  );
}
export default Cards;
