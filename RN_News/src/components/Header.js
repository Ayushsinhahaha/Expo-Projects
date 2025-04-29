import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <SafeAreaView style={{ height: 100, width: '100%', backgroundColor: 'dodgerblue', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: 'white', }}>News App</Text>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({})