import React, { useEffect } from 'react';
import Column from '../Column';
import NamePopup from '../NamePopup';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnWraper } from '../Column/columnStyling';
import {
  closeAddPopup,
  closePopupCard,
  clearChengeCard,
  clearChengeComment,
} from '../../store/actions';
import { slelectColumns } from '../../store/columnsSlice';

const escKeyCode = 27;

function App() {
  const dispatch = useDispatch();
  const columns = useSelector(slelectColumns);
  const escPress = (event: KeyboardEvent) => {
    if (event.keyCode === escKeyCode) {
      dispatch(closePopupCard());
      dispatch(closeAddPopup());
      dispatch(clearChengeCard());
      dispatch(clearChengeComment());
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', escPress);
    return () => {
      document.removeEventListener('keyup', escPress);
    };
  });

  const columnList = columns.map((column) => {
    return <Column column={column} key={column.id} />;
  });

  return (
    <div>
      <NamePopup />
      <ColumnWraper>{columnList}</ColumnWraper>
    </div>
  );
}
export default App;
