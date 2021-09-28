import React, { useEffect } from 'react';
import Column from '../Column';
import NamePopup from '../NamePopup';
import { useDispatch } from 'react-redux';
import {
  closeAddPopup,
  closePopupCard,
  clearChengeCard,
  clearChengeComment,
} from '../../store/actions';

function App() {
  const dispatch = useDispatch();
  const escKeyCode = 27;
  useEffect(() => {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === escKeyCode) {
        dispatch(closePopupCard());
        dispatch(closeAddPopup());
        dispatch(clearChengeCard());
        dispatch(clearChengeComment());
      }
    });
  });

  return (
    <div>
      <NamePopup />
      <Column />
    </div>
  );
}
export default App;
