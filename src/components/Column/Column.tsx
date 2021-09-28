import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../Cards';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { Form, Field } from 'react-final-form';
import plusIcon from '../assets/img/plus.png';
import { State } from '../../type';
import {
  openAddPopup,
  changeColumnName,
  statusChengeColumn,
  closeChengeColumn,
} from '../../store/actions';
import CreateCardsPopup from '../CreateCardsPopup';
import {
  NameColumn,
  FormContainer,
  ImgColumn,
  ButtonChenge,
  ButtonPlus,
  Flex,
  ButtonColumn,
  InputName,
  ChengeWraper,
  ColumnWraper,
  ColumnContent,
  CardsItem,
} from './columnStyling';

function Column() {
  const dispatch = useDispatch();
  const columns = useSelector((state: State) => state.columns);
  const cards = useSelector((state: State) => state.cards);
  function chengeNameColumn(idColumn: number) {
    dispatch(closeChengeColumn());
    dispatch(statusChengeColumn({ columnId: idColumn }));
  }
  const elementsColumn = columns.map((itemColumn) => {
    const { nameColumn, idColumn, statusChenge } = itemColumn;
    let change: JSX.Element;
    if (statusChenge === true) {
      change = (
        <div>
          <ChengeWraper>
            <Form
              onSubmit={(formObj: { newName: string }) => {
                if (formObj.newName) {
                  if (formObj.newName.trim()) {
                    dispatch(
                      changeColumnName({
                        columnId: itemColumn.idColumn,
                        newName: formObj.newName,
                      }),
                    );
                    dispatch(closeChengeColumn());
                  }
                }
              }}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <FormContainer>
                    <Field name="newName" defaultValue={nameColumn}>
                      {({ input }) => <InputName type="text" {...input} />}
                    </Field>
                    <ButtonColumn>Изменить</ButtonColumn>
                  </FormContainer>
                </form>
              )}
            </Form>
          </ChengeWraper>
        </div>
      );
    } else {
      change = (
        <div>
          <Flex>
            <NameColumn>{nameColumn}</NameColumn>
            <ButtonChenge onClick={() => chengeNameColumn(itemColumn.idColumn)}>
              <ImgColumn src={ChengeIcon} alt="chenge" />
            </ButtonChenge>
            <ButtonPlus
              onClick={() =>
                dispatch(
                  openAddPopup({
                    columnId: { idColumn }.idColumn,
                  }),
                )
              }>
              <ImgColumn src={plusIcon} alt="plus" />
            </ButtonPlus>
          </Flex>
        </div>
      );
    }

    const elements = cards.map((itemCards) => {
      if (itemCards.columnID === { idColumn }.idColumn) {
        return (
          <CardsItem key={itemCards.id}>
            <Cards card={itemCards} />
          </CardsItem>
        );
      }
    });

    return (
      <ColumnContent key={idColumn}>
        {change}
        {elements}
        <CreateCardsPopup column={itemColumn} />
      </ColumnContent>
    );
  });
  return <ColumnWraper>{elementsColumn}</ColumnWraper>;
}
export default Column;
