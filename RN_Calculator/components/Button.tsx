import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import {ThemeContext} from '../src/context/ThemeContext'
import {Styles} from '../src/styles/GlobalStyles'

export default function Button({ title, onPress, isBlue, isGray }) {
    const theme = useContext(ThemeContext);
  
    return (
      <TouchableOpacity
        style={
          isBlue
            ? Styles.btnBlue
            : isGray
            ? Styles.btnGray
            : theme === 'light'
            ? Styles.btnLight
            : Styles.btnDark
        }
        onPress={onPress}
      >
        <Text
          style={
            isBlue || isGray
              ? Styles.smallTextLight
              : theme === 'dark'
              ? Styles.smallTextLight
              : Styles.smallTextDark
          }
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }