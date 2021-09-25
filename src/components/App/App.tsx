import React, { useState } from 'react';
import Column from '../Column';
import CreateCardsPopup from '../CreateCardsPopup';
import CardPopup from '../CardPopup';
import NamePopup from '../NamePopup';
import { useDispatch } from 'react-redux';
import {
  closeAddPopupActionCreator,
  clearShowCardIdActionCreator,
  clearChengeThemeActionCreator,
  clearChengeTextActionCreator,
} from '../../store/actions';

function App() {
  const dispatch = useDispatch();
  const [escLisner, setEscLisner] = useState(true);

  function addListen() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        dispatch(clearShowCardIdActionCreator());
        dispatch(closeAddPopupActionCreator());
        dispatch(clearChengeThemeActionCreator());
        dispatch(clearChengeTextActionCreator());
      }
    });
  }

  if (escLisner === true) {
    addListen();
    setEscLisner(false);
  }

  return (
    <div>
      <NamePopup />
      <Column />
      <CreateCardsPopup />
      <CardPopup />
    </div>
  );
}
export default App;
