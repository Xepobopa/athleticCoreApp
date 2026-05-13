import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "../components/header/headerConfig";
import CloseButton from "../components/header/CloseButton";
import { DiaryProvider } from "./context";

export default function DiaryLayout() {
    return (
        <DiaryProvider>
            <Stack screenOptions={{ ...DEFAULT_HEADER_OPTIONS }}>
                <Stack.Screen name="index" />
                <Stack.Screen
                    name='picker'
                    options={{ 
                        presentation: 'pageSheet',
                        headerLeft: () => <CloseButton />
                    }}
                    />
            </Stack>
        </DiaryProvider>
    )
}