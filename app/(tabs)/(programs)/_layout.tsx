import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "../components/header/headerConfig";

export default function ProgramsLayout() {
    return (
        <Stack screenOptions={{ ...DEFAULT_HEADER_OPTIONS }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}