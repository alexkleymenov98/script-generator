import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 30px;
`;

export const Button = styled.button`
  border: none;
  background: blue;
  border-radius: 5px;
  padding: 15px 20px;
  color: white;
  cursor: pointer;
`;

export const BlockWithTemplate = styled.div`
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  gap: 15px;
  padding: 30px;
`;

export const CodeBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CodeNavBlock = styled.div`
  display: flex;
`;

export const ScriptBlock = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const ScriptTitle = styled.h4`
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

export const BlockCodes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const BlockSettings = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
export const SettingBtn = styled.button`
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
`;

export const ErrorText = styled.span`
  color: red;
`;

export const ButtonCode = styled.button`
  border: none;
  font-size: 14px;
  background: antiquewhite;
  padding: 7px 10px;
  cursor: pointer;
`;
