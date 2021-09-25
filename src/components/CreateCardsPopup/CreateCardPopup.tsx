import React, { useState } from 'react';
import crossIcon from '../assets/img/cross.png';
import { State } from '../../type';
import { Form, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeAddPopupActionCreator,
  createCardActionCreator,
} from '../../store/actions';
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

function CreateCardsPopup() {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const addPopupId = useSelector((state: State) => state.addPopup);

  let popup: JSX.Element;
  if (addPopupId !== -1) {
    popup = (
      <WrapperPopup onClick={() => dispatch(closeAddPopupActionCreator())}>
        <ContentPopup onClick={(e) => e.stopPropagation()}>
          <HeaderPopup>
            <HederText>Создание карточки</HederText>
            <ButtonCross onClick={() => dispatch(closeAddPopupActionCreator())}>
              <ImgPopup src={crossIcon} alt="cross" />
            </ButtonCross>
          </HeaderPopup>
          <Form
            onSubmit={(formObj: { theme: string; text: string }) => {
              if (formObj.theme && formObj.text) {
                if (formObj.theme.trim() && formObj.text.trim()) {
                  dispatch(
                    createCardActionCreator({
                      theme: formObj.theme,
                      text: formObj.text,
                      author: user,
                      columnID: addPopupId,
                    }),
                  );
                  dispatch(closeAddPopupActionCreator());
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
  } else {
    popup = <div></div>;
  }

  return (
    <div>
      <div> {popup}</div>
    </div>
  );
}
export default CreateCardsPopup;
