import Button from "@/components/Button";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { ThemedText } from "@/components/themed-text";
import ViewHighlighter from "@/components/view-highlighter";
import { CheckAndAddMockUsers, ClearAllData } from "@/services/storageService";

export default function SettingsScreen() {
    const navigation = useNavigation()
    const router = useRouter()

    const handleResetStorage = async () => {
        await ClearAllData()
        await CheckAndAddMockUsers()
    }

    const handleUpdateMetrics = () => {
        // router.push('/(auth)/onboarding-personal')
    }

    useEffect(() => {
        navigation.setOptions({ 
          title: "Settings",
          headerTitle: "Settings" 
        });
    }, [])

    return (
        <ScreenWrapper showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ gap: 32 }}>
            <View style={styles.box}>
                <ThemedText type='subtitle'>Data</ThemedText>
                {/* Reset Data */}
                <View>
                    <ViewHighlighter style={styles.highlighter}>
                        <Button 
                            text="Reset Storage" 
                            style={styles.button}
                            onClick={handleResetStorage}/>
                    </ViewHighlighter>
                    <ThemedText type='small' style={styles.comment}>Reset all data to the default state</ThemedText>
                </View>

                {/* Update Metrics */}
                <View>
                    <ViewHighlighter style={styles.highlighter}>
                        <Button 
                            text="Update metrics" 
                            style={styles.button}
                            onClick={handleUpdateMetrics}/>
                    </ViewHighlighter>
                    <ThemedText type='small' style={styles.comment}>Allows to update user metrics</ThemedText>
                </View>
            </View>

            <View style={styles.box}>
                <ThemedText type='subtitle'>Something else...</ThemedText>
                <ViewHighlighter style={styles.highlighter}>
                    <Button text="Click me!" style={styles.button}/>
                </ViewHighlighter>
                <ThemedText type='small' style={styles.comment}></ThemedText>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    box: {
        width: '100%',
        gap: 8
    },
    highlighter: {
        padding: 0,
        width: 'auto'
    },
    button: {
        width: '100%'
    },
    comment: {
        color: '#0000008b'
    }
})