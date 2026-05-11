import { Colors } from "@/constants/theme"
import React from "react"
import { ScrollView, ScrollViewProps, StyleSheet, ViewStyle } from "react-native"

export type ScreenWrapperProps = ScrollViewProps & {
    children: React.ReactNode,
    style?: ViewStyle
} 

export default function ScreenWrapper({ children, style, ...other }: ScreenWrapperProps) {
    return (
        <ScrollView style={[styles.container]} contentContainerStyle={{ paddingBottom: 16, ...style }} {...other}>
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        backgroundColor: Colors.light.background,
    }
})