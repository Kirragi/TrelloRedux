import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../Cards';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import { Form, Field } from 'react-final-form';
import plusIcon from '../assets/img/plus.png';
import {
  openAddPopup,
  changeColumnName,
  statusChengeColumn,
  closeChengeColumn,
} from '../../store/actions';
import CreateCardsPopup from '../CreateCardsPopup';
import { slelectCard } from '../../store/cardSlice';
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
  ColumnContent,
  CardsItem,
} from './columnStyling';
import { ColumnType } from '../../type';

function Column(props: { column: ColumnType }) {
  const dispatch = useDispatch();
  const column = props.column;
  const cards = useSelector(slelectCard(column.id));

  function chengeNameColumn(id: number) {
    dispatch(closeChengeColumn());
    dispatch(statusChengeColumn({ id: id }));
  }

  const cardList = cards.map((card) => {
    return (
      <CardsItem key={card.id}>
        <Cards card={card} />
      </CardsItem>
    );
  });

  if (props.column.statusChenge) {
    return (
      <ColumnContent key={column.id}>
        <ChengeWraper>
          <Form
            onSubmit={(formObj: { newName: string }) => {
              if (formObj.newName) {
                if (formObj.newName.trim()) {
                  dispatch(
                    changeColumnName({
                      id: column.id,
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
                  <Field name="newName" defaultValue={column.nameColumn}>
                    {({ input }) => <InputName type="text" {...input} />}
                  </Field>
                  <ButtonColumn>Изменить</ButtonColumn>
                </FormContainer>
              </form>
            )}
          </Form>
        </ChengeWraper>
        {cardList}
        <CreateCardsPopup column={column} />
      </ColumnContent>
    );
  }

  return (
    <ColumnContent key={column.id}>
      <Flex>
        <NameColumn>{column.nameColumn}</NameColumn>
        <ButtonChenge onClick={() => chengeNameColumn(column.id)}>
          <ImgColumn src={ChengeIcon} alt="chenge" />
        </ButtonChenge>
        <ButtonPlus
          onClick={() =>
            dispatch(
              openAddPopup({
                id: column.id,
              }),
            )
          }>
          <ImgColumn src={plusIcon} alt="plus" />
        </ButtonPlus>
      </Flex>
      {cardList}
      <CreateCardsPopup column={column} />
    </ColumnContent>
  );
}
export default Column;
