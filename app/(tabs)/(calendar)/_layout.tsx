import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "../components/header/headerConfig";
import BackButton from "../components/header/BackButton";

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ ...DEFAULT_HEADER_OPTIONS }}>
            <Stack.Screen name="index" />
            <Stack.Screen
                name='[date]'
                options={{ headerLeft: () => <BackButton /> }}
                />
        </Stack>
    )
}