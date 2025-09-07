import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '../constants/Colours'

const Safe_Screen = ({ children }) => {
    const insert = useSafeAreaInsets()
    return (
        <View style={[style.container, { paddingTop: insert.top}]}>
            {children}</View>)

}

export default Safe_Screen


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    }

})