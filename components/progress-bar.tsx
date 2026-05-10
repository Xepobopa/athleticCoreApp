import { ColorValue, View } from "react-native";

export interface ProgressBarProps {
    current: number;
    target: number;
    color: ColorValue;
}

export default function ProgressBar({ current, target, color }: ProgressBarProps) {
    return (
        <View style={{ 
            width: '100%', height: 8, backgroundColor: '#F9DCD4', borderRadius: 999 
        }}>
            <View style={{ 
                width: `${(current / target) * 100}%`, height: '100%', backgroundColor: color, borderRadius: 999 
            }} />
        </View>
    )
}

