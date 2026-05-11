import { ThemedText } from "@/components/themed-text";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";

export default function IntenseBadge({ isAbsolute = false }: { isAbsolute?: boolean }) {
    return (
        <View style={{
            ...styles.container,
            ...(isAbsolute ? styles.absolute : {})
        }}>
            <SymbolView name="flame.fill" size={16} tintColor="#FF5F1F" />
            <ThemedText type='small'>Intense</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFFF2', // F2 - 90% opacity
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    absolute: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
    }
})