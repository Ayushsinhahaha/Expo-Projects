//  import * as React from 'react'
import React, { useState } from 'react';
import Button from './Button'
import { Text, View } from 'react-native'
import { Styles } from '@/src/styles/GlobalStyles'
import { myColors } from '@/src/styles/Colors'

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('')
  const [result, setResult] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const handleNumberPress = (num) => {
    if (operation === '') {
      setFirstNumber(firstNumber + num);
    } else {
      setSecondNumber(secondNumber + num);
    }
  }

  const handleOperationPress = (op) => {
    // setOperation(buttonValue);
    // setSecondNumber(firstNumber);
    // setFirstNumber('')
    if (firstNumber != '') {
      setOperation(op);
    }
  }

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('')
    setResult(null)
  }

  const getResult = () => {
    switch (operation) {
      case '+':
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case '-':
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case '*':
        setResult(parseInt(secondNumber) * parseInt(firstNumber));
        break;
      case '/':
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber));
        break;

      default:
        clear();
        setResult(0);
        break;
    }
  }

  const handleEqualPress = () => {
    let res = 0;
    const num1 = parseInt(firstNumber);
    const num2 = parseInt(secondNumber);

    if (operation === '+') res = num1 + num2;
    else if (operation === '-') res = num1 - num2;
    else if (operation === '*') res = num1 * num2;
    else if (operation === '/') res = num1 / num2;

    setResult(res.toString());
    setFirstNumber(res.toString());
    setSecondNumber('');
    setOperation('');
    setIsVisible(false)
  }


  return (
    <View style={Styles.viewBottom}>
      {
        isVisible ? (
          <View style={Styles.resultBox}>
            {/* <Text>{}</Text> */}
            <Text style={{ textAlign: 'right', fontSize: 48, paddingHorizontal: 10, color: 'gray' }}>{firstNumber}{operation}{secondNumber}</Text>
          </View>
        ) : (null)
      }

      <View style={Styles.resultBox}>
        {/* <Text>{}</Text> */}
        <Text style={{ textAlign: 'right', fontSize: 48, paddingHorizontal: 10, color: 'gray' }}>{secondNumber != '' ? secondNumber : firstNumber || '0'}</Text>
      </View>

      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="=" isBlue onPress={() => handleEqualPress()} />
      </View>
    </View>
  )

}