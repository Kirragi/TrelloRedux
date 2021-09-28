import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { State } from '../../type';
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

function NamePopup() {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  let popup: JSX.Element;
  if (user === '') {
    popup = (
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
  } else {
    popup = <Name>{user}</Name>;
  }

  return (
    <div>
      <div> {popup}</div>
    </div>
  );
}
export default NamePopup;
