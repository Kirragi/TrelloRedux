import React from 'react';
import crossIcon from '../assets/img/cross.png';
import { ColumnType } from '../../type';
import { Form, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { closeAddPopup, createCard } from '../../store/actions';
import { slelectUser } from '../../store/userSlice';
import {
  WrapperPopup,
  HeaderPopup,
  ContentPopup,
  ButtonCross,
  ImgPopup,
  HederText,
  TextPopup,
  ThemeInput,
  Textarea,
  Button,
} from './createCardStyling';

function CreateCardsPopup(props: { column: ColumnType }) {
  const dispatch = useDispatch();
  const user = useSelector(slelectUser);

  if (props.column.statusAddPopup) {
    return (
      <WrapperPopup onClick={() => dispatch(closeAddPopup())}>
        <ContentPopup onClick={(e) => e.stopPropagation()}>
          <HeaderPopup>
            <HederText>Создание карточки</HederText>
            <ButtonCross onClick={() => dispatch(closeAddPopup())}>
              <ImgPopup src={crossIcon} alt="cross" />
            </ButtonCross>
          </HeaderPopup>
          <Form
            onSubmit={(formObj: { theme: string; text: string }) => {
              if (formObj.theme && formObj.text) {
                if (formObj.theme.trim() && formObj.text.trim()) {
                  dispatch(
                    createCard({
                      theme: formObj.theme,
                      text: formObj.text,
                      author: user,
                      idColumn: props.column.id,
                    }),
                  );
                  dispatch(closeAddPopup());
                }
              }
            }}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextPopup>Тема карточки</TextPopup>
                <Field name="theme">
                  {({ input }) => (
                    <ThemeInput type="text" placeholder="Тема" {...input} />
                  )}
                </Field>
                <TextPopup>Описание карточки</TextPopup>
                <Field name="text">
                  {({ input }) => (
                    <Textarea
                      placeholder="Текст карточки"
                      {...input}></Textarea>
                  )}
                </Field>
                <Button>добавить запись</Button>
              </form>
            )}
          </Form>
        </ContentPopup>
      </WrapperPopup>
    );
  }
  return <></>;
}
export default CreateCardsPopup;
