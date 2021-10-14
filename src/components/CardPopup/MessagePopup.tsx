import React from 'react';
import { Form, Field } from 'react-final-form';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { useDispatch } from 'react-redux';
import { CardType } from '../../type';
import {
  clearChengeCard,
  changeCardText,
  chengeStatusText,
} from '../../store/actions';
import {
  ImgText,
  Textarea,
  ButtonText,
  ButtonChenge,
} from './cardPopupStyling';

function MessagePopup(props: { card: CardType }) {
  const card: CardType = props.card;
  const dispatch = useDispatch();

  if (card.statusText === false) {
    return (
      <div>
        <span>{card.text}</span>
        <ButtonChenge
          onClick={() => dispatch(chengeStatusText({ id: card.id }))}>
          <ImgText src={ChengeIcon} alt="" />
        </ButtonChenge>
      </div>
    );
  }

  return (
    <Form
      onSubmit={(formObj: { newText: string }) => {
        if (formObj.newText) {
          if (formObj.newText.trim()) {
            dispatch(
              changeCardText({
                id: card.id,
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
  );
}

export default MessagePopup;
