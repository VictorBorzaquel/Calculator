import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import I18n from 'i18n-js';

import {
  Button,
  Buttons,
  ButtonText,
  ButtonWrapper,
  Container,
  Delete,
  DeleteButton,
  Display,
  ErrorMessage,
  Output
} from './styles';

export function Home() {
  const { width } = Dimensions.get('screen')
  const [errorMessage, setErrorMessage] = useState('')

  const [math, setMath] = useState('')
  const [placeholder, setPlaceholder] = useState(false)

  const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '.', '0', '=', '/']

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const operators = ['+', '-', '*', '/']
  const operatorsBr = ['+', '-', 'x', '÷']
  const deleteLast = 'C'
  const deleteAll = 'AC'
  const dot = '.'
  const equals = '='

  function handleButtonPress(buttonPressed: string) {
    setMath(calculeMath(buttonPressed));
  }

  function toOperator (operator: string) {
    const isOperator = operatorsBr[operators.indexOf(operator)]

    if (!isOperator) return operator

    return operatorsBr[operators.indexOf(operator)]
  }

  function toNumber(number: string) {
    if (number === '.') return '0,'

    return I18n.toNumber(Number(number), {
      delimiter: '.',
      separator: ',',
      precision: 8,
      strip_insignificant_zeros: true
    })
  }

  function toMath (math: string) {
    return String(math)
      .trim()
      .split(' ')
      .map(item => operators.includes(item) ? toOperator(item) : toNumber(item))
      .join(' ')
  }

  function getDisplayFormat() {
    if (math === '') return '0'

    return toMath(math)
  }

  function calculeMath(buttonPressed: string): string {
    setErrorMessage('')
    if (placeholder) setPlaceholder(false)

    const mathArray = math.trimEnd().split(' ')
    const lastInput = mathArray[mathArray.length - 1]

    if (numbers.includes(buttonPressed)) {
      const [number, decimal] = lastInput.split('.')
      
      if (number.length >= 8) {
        setErrorMessage('Não é possivel adicionar mais de 8 digitos!')
        return math
      }

      if (!!decimal && decimal.length >= 3) {
        setErrorMessage('Não é possivel adicionar mais de 3 casas decimais!')
        return math
      }

      return math + buttonPressed
    }

    if (operators.includes(buttonPressed)) {
      if (math === '' || operators.includes(lastInput)) return math

      return `${math} ${buttonPressed} `
    }

    switch (buttonPressed) {
      case dot:
        return lastInput.includes('.')
          ? math
          : math + buttonPressed
      case deleteLast: return math.slice(0, math.trimEnd().length - 1)
      case deleteAll: return ''
      case equals:
        setPlaceholder(true)
        if (math === '') return '0'
        if (operators.includes(lastInput)) return eval(calculeMath(deleteLast)).toString()

        const result = eval(math).toString() as string

        const [number, decimal] = result.split('.')

        if (number.length > 8) {
          setErrorMessage('Não é possivel calcular resultados com mais de 8 digitos!')
          return ''
        }
        if (!!decimal && decimal.length > 3) {
          setErrorMessage('Não é possivel calcular resultados com mais de 3 casas decimais!')
          return Number(result).toFixed(3)
        }
        return result
      default: return math
    }
  }

  return (
    <Container>
      <Display>
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <Output>{getDisplayFormat()}</Output>
      </Display>

      <Delete>
        <DeleteButton onPress={() => handleButtonPress('C')}>
          <ButtonText>C</ButtonText>
        </DeleteButton>
        <DeleteButton onPress={() => handleButtonPress('AC')}>
          <ButtonText>AC</ButtonText>
        </DeleteButton>
      </Delete>

      <Buttons>
        {buttons.map(button => (
          <ButtonWrapper key={button} size={width} button={button}>
            <Button onPress={() => handleButtonPress(button)}>
              <ButtonText>{toOperator(button)}</ButtonText>
            </Button>
          </ButtonWrapper>
        ))}
      </Buttons>
    </Container >
  );
}
