import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    userContainer: {
        gap: 20,
    
        borderTopColor: '#FF5F1F',
        borderTopWidth: 4,

        marginBottom: 24
    },
    gainContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metricsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    }
})