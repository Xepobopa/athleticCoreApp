import { Colors } from "@/constants/theme"
import React from "react"
import { ScrollView, StyleSheet, View, ViewProps, ViewStyle } from "react-native"

export interface ScreenWrapperProps {
    children: React.ReactNode,
    style?: ViewStyle
}

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
    return (
        <ScrollView style={[styles.container]} contentContainerStyle={{ paddingBottom: 16, ...style }} >
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