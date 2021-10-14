import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  Button,
  WrapperPopup,
  ContentPopup,
  YourName,
  InputName,
  Flex,
  Name,
} from './nameStyling';
import { setUser } from '../../store/actions';
import { slelectUser } from '../../store/userSlice';

function NamePopup() {
  const dispatch = useDispatch();
  const user = useSelector(slelectUser);
  if (user === '') {
    return (
      <WrapperPopup>
        <ContentPopup>
          <Form
            onSubmit={(formObj: { name: string }) => {
              if (formObj.name) {
                if (formObj.name.trim()) {
                  dispatch(setUser({ userName: formObj.name }));
                }
              }
            }}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <YourName>Как вас зовут?</YourName>
                <Flex>
                  <Field name="name">
                    {({ input }) => <InputName type="text" {...input} />}
                  </Field>
                  <Button>Готово</Button>
                </Flex>
              </form>
            )}
          </Form>
        </ContentPopup>
      </WrapperPopup>
    );
  }
  return <Name>{user}</Name>;
}
export default NamePopup;
