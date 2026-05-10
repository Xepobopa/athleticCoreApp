import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

export interface ButtonProps {
    text: string;
    textStyle?: TextStyle;
    IconLeft?: React.ReactNode;
    IconRight?: React.ReactNode;
    onClick?: () => void;
    style?: ViewStyle;
}

export default function Button({ text, textStyle, IconLeft, IconRight, onClick, style }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onClick}>
            {IconLeft}
            <ThemedText type='defaultSemiBold' style={[styles.text, textStyle]}>
                {text}
            </ThemedText>
            {IconRight}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',

        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
    },
    text: {
        marginVertical: 12,
    }
})