import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  transition: all 0.1s ease-out;
  grid-template-columns: ${(props) => `repeat(3,1fr)`};
  height: 100%;
  padding: 20px;
`;

export const HomePage = styled.div`
  display: flex;
  height: 100%;
`;

export const MainContainer = styled.div`
  flex: 3;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled.div`
  margin: 8px;
  background-color: white;
  border-radius: 2px;
  display: flex;
  font-family: Helvetica;
  font-size: 14px;
  color: #95a1c2;
  letter-spacing: 0;
`;
export const HeaderContainer = styled.div`
  display: flex;
  margin: 8px 8px 0px 8px;
  padding: 8px 8px 0px 8px;
  align-items: center;
`;

export const IconContainer = styled.div`
  background-color: ${(props) => props.color};
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CountContainer = styled.div`
  width: 28px;
  height: 17px;
  border-radius: 8px;
  border-radius: 8px;
  font-family: Helvetica;
  font-size: 12px;
  color: #95a1c2;
  letter-spacing: 0;
  text-align: center;
`;

export const HeaderLane = styled.div`
  display: flex;
`;
