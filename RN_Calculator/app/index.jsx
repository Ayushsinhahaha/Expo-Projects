import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemeContext } from '../src/context/ThemeContext'
import { myColors } from '@/src/styles/Colors'
import Button from '@/components/Button'
import MyKeyboard from '@/components/MyKeyboard'



const index = () => {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <View style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#000' }]}>
        <StatusBar style='auto' />
        <Switch value={theme === 'light'} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        <MyKeyboard />
      </View>
    </ThemeContext.Provider>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})