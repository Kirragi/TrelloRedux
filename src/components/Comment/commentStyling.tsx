import styled from 'styled-components';
export const ButtonChenge = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;s
  }
`;
export const ImgText = styled.img`
  height: 20px;
  width: 20spx;
`;
export const InputComment = styled.input`
  height: 24px;
  width: 250px;
  border-radius: 3px;
  margin: 10px 0;
  border: 2px solid black;
  font-size: 15px;
  font-family: 'Roboto';
  font-weight: 400;
`;
export const ButtonComment = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 10px 0 10px 20px;
  font-size: 16px;
  font-family: 'Roboto';
  padding: 0.25em 1em;
  &:hover {
    cursor: pointer;
  }
`;
export const CommentWrapper = styled.div`
  border-top: 2px solid palevioletred;
`;
export const ButtonTrash = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;s
  }
`;
export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ImgTheme = styled.img`
  height: 30px;
  width: 30spx;
`;
