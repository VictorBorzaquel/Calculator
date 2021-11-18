import styled from "styled-components/native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
`;

export const Display = styled.View`
  flex: 1;
  background-color: #333;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #f00;
`;

export const Output = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding: 20px 0; */
`;

export const Delete = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #ddd;
`;

export const ButtonWrapper = styled.View<{ size: number, button: string }>`
  width: ${({ size }) => size / 4}px;
  height: ${({ size }) => size / 4}px;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(BorderlessButton)`
  padding: 15px;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;