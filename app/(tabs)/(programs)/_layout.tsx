import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "../components/header/headerConfig";
import BackButton from "../components/header/BackButton";

export default function ProgramsLayout() {
    return (
        <Stack screenOptions={{ ...DEFAULT_HEADER_OPTIONS }}>
            {/* Главный экран со списком программ */}
            <Stack.Screen 
                name="index" 
            />
            {/* Экран расписания конкретной программы (7 дней) */}
            <Stack.Screen
                name="program/[id]" 
                options={{ headerLeft: () => <BackButton />, title: 'Program Details' }}
            />
            <Stack.Screen 
                name="exercise/[id]" 
                options={{ headerLeft: () => <BackButton />, title: 'Exercise Details' }}
            />
        </Stack>
    )
}