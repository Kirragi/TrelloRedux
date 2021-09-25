import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../Cards';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { Form, Field } from 'react-final-form';
import plusIcon from '../assets/img/plus.png';
import { State } from '../../type';
import {
  openAddPopupActionCreator,
  changeColumnTitleActionCreator,
} from '../../store/actions';
import {
  NameColumn,
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
  const [chengeColumn, setChengeColumn] = useState({
    statusColumn: false,
    chengeIdColumn: -1,
  });
  const column = useSelector((state: State) => state.columns);
  const cardState = useSelector((state: State) => state.cards);

  function switchChenge(indexCol: number) {
    setChengeColumn({ statusColumn: true, chengeIdColumn: indexCol });
  }
  const elementsColumn = column.map((itemColumn) => {
    const { nameColumn, indexColumn } = itemColumn;
    let change: JSX.Element;
    if (chengeColumn.chengeIdColumn === indexColumn) {
      change = (
        <div>
          <ChengeWraper>
            <Form
              onSubmit={(formObj: { newName: string }) => {
                if (formObj.newName) {
                  if (formObj.newName.trim()) {
                    dispatch(
                      changeColumnTitleActionCreator({
                        columnId: itemColumn.indexColumn,
                        newName: formObj.newName,
                      }),
                    );
                    setChengeColumn({
                      statusColumn: false,
                      chengeIdColumn: -1,
                    });
                  }
                }
              }}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="newName" defaultValue={nameColumn}>
                    {({ input }) => (
                      <InputName
                        type="text"
                        {...input}
                        defaultValue={nameColumn}
                      />
                    )}
                  </Field>
                  <ButtonColumn>Изменить</ButtonColumn>
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
            <ButtonChenge onClick={() => switchChenge(itemColumn.indexColumn)}>
              <ImgColumn src={ChengeIcon} alt="chenge" />
            </ButtonChenge>
            <ButtonPlus
              onClick={() =>
                dispatch(
                  openAddPopupActionCreator({
                    columnId: { indexColumn }.indexColumn,
                  }),
                )
              }>
              <ImgColumn src={plusIcon} alt="plus" />
            </ButtonPlus>
          </Flex>
        </div>
      );
    }

    const elements = cardState.map((itemCards) => {
      const card = itemCards;
      if (itemCards.columnID === { indexColumn }.indexColumn) {
        return (
          <CardsItem key={itemCards.id}>
            <Cards card={card} />
          </CardsItem>
        );
      }
    });

    return (
      <ColumnContent key={indexColumn}>
        {change}
        {elements}
      </ColumnContent>
    );
  });
  return <ColumnWraper>{elementsColumn}</ColumnWraper>;
}
export default Column;
