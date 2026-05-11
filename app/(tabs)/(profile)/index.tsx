import Button from "@/components/Button";
import ProgressBar from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import ViewHighlighter from "@/components/view-highlighter";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { styles } from "./styles";

export default function ProfileTab() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/login');
    }

    const handleSettings = () => {
        router.push('/(tabs)/(profile)/settings');
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
                    <ViewHighlighter style={{width: 'auto', flex: 1}}>
                        <BodyMetric 
                            icon={<SymbolView name='scalemass.fill' size={24} tintColor={'#AB3600'} />}
                            value={user.weight} 
                            unit="KG"/>
                    </ViewHighlighter>
                    <ViewHighlighter style={{width: 'auto', flex: 1,}}>
                        <BodyMetric 
                            icon={<SymbolView name='ruler.fill' size={24} tintColor={'#0058BC'} />}
                            value={user.height} 
                            unit="CM" />
                    </ViewHighlighter>
                    <ViewHighlighter style={{width: 'auto', flex: 1}}>
                        <BodyMetric 
                            icon={<SymbolView name='birthday.cake.fill' size={24} tintColor={'#006493'} />}
                            value={user.age} 
                            unit="YRS" />
                    </ViewHighlighter>
                </View>
            </View>

            <View style={{marginTop: 32}}>
                <ThemedText type='big' style={{ fontSize: 22 }}>Settings</ThemedText>
                <ViewHighlighter style={{marginTop: 8, padding: 0}}>
                    <Settings list={[
                        { label: 'Account', Icon: <SymbolView name='gear' size={24} tintColor={'black'}/>, onPress: handleSettings },
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
    icon:  React.ReactNode;
    value: number;
    unit: string;
}
function BodyMetric({ value, unit, icon }: BodyMetricProps) {
    return (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, width: '100%'}}>
            {icon}
            <ThemedText type='title'>{value}</ThemedText>
            <ThemedText type='defaultThin' style={{marginBottom: 4}}>{unit}</ThemedText>

            {/* {
                value > valueTarget ? (
                    <ProgressBar current={valueTarget} target={value} color={color} />
                ) : (
                    <ProgressBar current={value} target={valueTarget} color={color} />
                )
            }
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ThemedText type='small'>Target: {valueTarget} {unit}</ThemedText>
            </View> */}
        </View>
    );
}

function Gain({ goal }: { goal: 'muscle' | 'fat_loss'| 'fit' }) {
    switch (goal) {
        case 'fit':
            return (
                <View style={{
                    ...styles.gainContainer, 
                    backgroundColor: '#b9b9ff' 
                }}>
                    <SymbolView name='heart.fill' size={24} tintColor={'black'} />
                    <ThemedText type='small'>Goal: Stay Fit</ThemedText>
                </View>
            )
        case 'muscle':
            return (
                <View style={{
                    ...styles.gainContainer, 
                    backgroundColor: '#ffc8c8'
                }}>
                    <SymbolView name='figure.strengthtraining.traditional' size={24} tintColor={'black'} />
                    <ThemedText type='small'>Goal: Muscle Gain</ThemedText>
                </View>
            )
        case 'fat_loss':
            return (
                <View style={{
                    ...styles.gainContainer, 
                    backgroundColor: '#bbfcc9'
                }}>
                    <SymbolView name='figure.run' size={24} tintColor={'black'} />
                    <ThemedText type='small'>Goal: Fat Loss</ThemedText>
                </View>
            )
    }
}
//                 backgroundColor: goal === 'muscle' ? '#F9D4D4' : '#D4F9DC'
//             }}>
//             {goal === 'muscle' ? (
//                     <SymbolView name='figure.strengthtraining.traditional' size={24} tintColor={'black'} />
//                 ) : (
//                     <SymbolView name='figure.run' size={24} tintColor={'black'} />
//             )}
//             <ThemedText type='small'>Goal: {goal === 'muscle' ? 'Muscle Gain' : 'Fat Loss'}</ThemedText>
//         </View>
//     )
// }