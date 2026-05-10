import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

export interface ViewHighlighterProps {
    children: React.ReactNode;
    style?: ViewStyle
}

export default function ViewHighlighter({ style, children }: ViewHighlighterProps) {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        
        gap: 8,
        
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        
        borderColor: '#ecd3cb',
        borderWidth: 1,
    }
})