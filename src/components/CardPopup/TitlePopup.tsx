import React from 'react';
import { Form, Field } from 'react-final-form';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { useDispatch } from 'react-redux';
import { CardType } from '../../type';
import {
  changeCardTheme,
  chengeStatusTheme,
  clearChengeCard,
} from '../../store/actions';
import {
  ThemeText,
  ThemeWrapper,
  ImgTheme,
  ButtonChenge,
  InputTheme,
  ButtonTheme,
} from './cardPopupStyling';
function TitlePopup(props: { card: CardType }) {
  const card: CardType = props.card;
  const dispatch = useDispatch();

  if (card.statusTheme === false) {
    return (
      <ThemeWrapper>
        <ThemeText>{props.card.theme}</ThemeText>
        <ButtonChenge
          onClick={() => dispatch(chengeStatusTheme({ id: card.id }))}>
          <ImgTheme src={ChengeIcon} alt="" />
        </ButtonChenge>
      </ThemeWrapper>
    );
  }

  return (
    <Form
      onSubmit={(formObj: { newTheme: string }) => {
        if (formObj.newTheme) {
          if (formObj.newTheme.trim()) {
            dispatch(
              changeCardTheme({
                id: card.id,
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
  );
}

export default TitlePopup;
