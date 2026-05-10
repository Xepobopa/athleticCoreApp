import Button from "@/components/Button";
import ProgressBar from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import ViewHighlighter from "@/components/view-highlighter";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { ActivityIndicator, ColorValue, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { styles } from "./styles";

export default function ProfileTab() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/login');
    }

    if (!user) {
        return <ScreenWrapper style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="black" />
        </ScreenWrapper>
    }

    return (
        <ScreenWrapper>
            <ViewHighlighter style={styles.userContainer}>
                <SymbolView name="person" size={64} />
                <ThemedText type='title'>{user?.name}</ThemedText>
                <Gain goal={user.goal} />
            </ViewHighlighter>

            <View>
                <ThemedText type='big' style={{ fontSize: 22 }}>Body Metrics</ThemedText>
                <View style={styles.metricsContainer}>
                    <ViewHighlighter style={{width: 'auto', flex: 1, alignItems: 'flex-start', gap: 8, justifyContent: 'flex-start'}}>
                        <BodyMetric 
                            label="Weight" 
                            icon={<SymbolView name='scalemass.fill' size={24} tintColor={'black'} />}
                            value={user.weight} 
                            valueTarget={user.weightTarget}
                            unit="kg"
                            color={'red'} />
                    </ViewHighlighter>
                    <ViewHighlighter style={{width: 'auto', flex: 1, alignItems: 'flex-start', gap: 8, justifyContent: 'flex-start'}}>
                        <BodyMetric 
                            label="Body Fat" 
                            icon={<SymbolView name='drop' size={24} tintColor={'black'} />}
                            value={user.fat} 
                            valueTarget={user.fatTarget}
                            unit="%" 
                            color={'purple'} />
                    </ViewHighlighter>
                </View>
            </View>

            <View style={{marginTop: 32}}>
                <ThemedText type='big' style={{ fontSize: 22 }}>Settings</ThemedText>
                <ViewHighlighter style={{marginTop: 8, padding: 0}}>
                    <Settings list={[
                        { label: 'Account', Icon: <SymbolView name='gear' size={24} tintColor={'black'}/>, onPress: () => {} },
                    ]} />
                </ViewHighlighter>
            </View>

            <ViewHighlighter style={{marginTop: 32, padding: 0}}>
                <Button 
                    text="Log out" 
                    onClick={handleLogout} 
                    style={{width: '100%'}} 
                    textStyle={{color: '#BA1A1A'}} 
                    IconLeft={<SymbolView name='rectangle.portrait.and.arrow.forward' tintColor={'#BA1A1A'}/>}/>
            </ViewHighlighter>
        </ScreenWrapper>
    )
}

interface SettingsElemProps {
    label: string; 
    Icon: React.ReactNode; 
    onPress: () => void
}
function Settings({ list }: { list: SettingsElemProps[] }) {
    return (
        <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
        }}>
            {list.map(({ label, Icon, onPress }, index) => {
                return (
                        <Button 
                            key={index}
                            text={label} 
                            onClick={onPress}
                            style={{
                                width: '100%',
                                paddingHorizontal: 0,

                                ...(index !== list.length - 1 ? { borderBottomColor: '#F0E0D9', borderBottomWidth: 1 } : {})
                            }} 
                            textStyle={{color: '#333'}} 
                            IconLeft={Icon} />
                )
            })}
        </View>
    )
}

interface BodyMetricProps {
    label: string;
    icon:  React.ReactNode;
    value: number;
    valueTarget: number;
    unit: string;
    color?: ColorValue; 
}
function BodyMetric({ label, value, valueTarget, unit, icon, color = 'red' }: BodyMetricProps) {
    return (
        <View style={{flexDirection: 'column', gap: 8, width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                {icon}
                <ThemedText type='defaultThin'>{label}</ThemedText>
            </View>
        
            <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 4}}>
                <ThemedText type='title'>{value}</ThemedText>
                <ThemedText type='defaultThin' style={{marginBottom: 4}}>{unit}</ThemedText>
            </View>
            
            {
                value > valueTarget ? (
                    <ProgressBar current={valueTarget} target={value} color={color} />
                ) : (
                    <ProgressBar current={value} target={valueTarget} color={color} />
                )
            }
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ThemedText type='small'>Target: {valueTarget} {unit}</ThemedText>
            </View>
        </View>
    );
}

function Gain({ goal }: { goal: 'muscle' | 'fat_loss' }) {
    return (
        <View 
            style={{
                ...styles.gainContainer, 
                backgroundColor: goal === 'muscle' ? '#F9D4D4' : '#D4F9DC'
            }}>
            {goal === 'muscle' ? (
                    <SymbolView name='figure.strengthtraining.traditional' size={24} tintColor={'black'} />
                ) : (
                    <SymbolView name='figure.run' size={24} tintColor={'black'} />
            )}
            <ThemedText type='small'>Goal: {goal === 'muscle' ? 'Muscle Gain' : 'Fat Loss'}</ThemedText>
        </View>
    )
}