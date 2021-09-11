import React, { useState } from 'react';
import Cards from '../Cards';
import ChengeIcon from '../assets/img/ChengeIcon.png';
import plusIcon from '../assets/img/plus.png';
import { ColumnProps } from '../App/entity';
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

function Column(props: ColumnProps) {
  const [newNameColumn, setNameColumn] = useState('');
  const [chengeColumn, setChengeColumn] = useState({
    statusColumn: false,
    chengeIdColumn: -1,
  });

  function onNewNameColumn(e: React.FormEvent<HTMLInputElement>): void {
    setNameColumn(e.currentTarget.value);
  }

  function switchChenge(value: string, indexCol: number) {
    setChengeColumn({ statusColumn: true, chengeIdColumn: indexCol });
    setNameColumn(value);
  }
  function onChenge(indexColumn: number) {
    props.newNameColumn(newNameColumn, indexColumn);
    setChengeColumn({ statusColumn: false, chengeIdColumn: -1 });
  }
  const elementsColumn = props.dataColumn.map((itemColumn) => {
    const { nameColumn, indexColumn } = itemColumn;
    let change: JSX.Element;
    if (
      chengeColumn.statusColumn &&
      chengeColumn.chengeIdColumn === indexColumn
    ) {
      change = (
        <div>
          <ChengeWraper>
            <InputName
              type="text"
              defaultValue={nameColumn}
              onChange={onNewNameColumn}
            />
            <ButtonColumn onClick={() => onChenge(itemColumn.indexColumn)}>
              Изменить
            </ButtonColumn>
          </ChengeWraper>
        </div>
      );
    } else {
      change = (
        <div>
          <Flex>
            <NameColumn>{nameColumn}</NameColumn>
            <ButtonChenge
              onClick={() =>
                switchChenge({ nameColumn }.nameColumn, itemColumn.indexColumn)
              }>
              <ImgColumn src={ChengeIcon} alt="chenge" />
            </ButtonChenge>
            <ButtonPlus
              onClick={() =>
                props.setActive([
                  { status: true, createIndex: { indexColumn }.indexColumn },
                ])
              }>
              <ImgColumn src={plusIcon} alt="plus" />
            </ButtonPlus>
          </Flex>
        </div>
      );
    }

    const elements = props.dataCards.map((itemCards) => {
      const card = itemCards;
      if (itemCards.columnID === { indexColumn }.indexColumn) {
        return (
          <CardsItem key={itemCards.id}>
            <Cards
              cards={props.dataCards}
              card={card}
              onDelete={() => props.onDelete(itemCards.id)}
              onToggleChecked={() => props.onToggleChecked(itemCards.id)}
              setPopupCard={props.setPopupCard}
              comments={props.comments}
            />
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
