import Button from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import ViewHighlighter from "@/components/view-highlighter";
import { useAuth } from "@/hooks/use-auth";
import { SetUserKcalTarget } from "@/services/diaryService";
import { calculateAllMacros } from "@/services/MacroService";
import { User } from "@/services/storageService";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { default as React, useEffect } from "react";
import { ActivityIndicator, TextInput, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { styles } from "./styles";

export default function ProfileTab() {
    const { user, logout, updateUser, isReady } = useAuth();
    const [metricsEdit, setMetricsEdit] = React.useState(false)
    const [weight, setWeight] = React.useState(0)
    const [height, setHeight] = React.useState(0)
    const [age, setAge] = React.useState(0)

    useEffect(() => {
        if (isReady && user) {
            setWeight(user.weight)
            setHeight(user.height)
            setAge(user.age)
        }
    }, [user, isReady])

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/login');
    }

    const handleSettings = () => {
        router.push('/(tabs)/(profile)/settings');
    }

    const handleToggleEditMetrics = () => {
        if (!user) return

        if (metricsEdit) {
            // save changes
            // validate
            if (weight <= 0 || weight > 300) {
                setWeight(user.weight)
            }
            if (height <= 0 || height > 250) {
                setHeight(user.height)
            }
            if (age <= 14 || age > 100) {
                setAge(user.age)
            }

            // does not update, if nothing changed 
            if (
                weight === user.weight &&
                height === user.height &&
                age === user.age
            ) {
                
            } else {
                updateUser({ id: user.id, weight, height, age } as User)
                
                // and recalculate kcal target
                const calories = calculateAllMacros(weight, height, age, user.goal)
                console.log('update to :', calories)
                SetUserKcalTarget(user.id, calories)
            }
        }

        setMetricsEdit(!metricsEdit)
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
                <View style={{...styles.row, justifyContent: 'space-between', alignItems: 'center'}}>
                    <ThemedText type='big' style={{ fontSize: 22 }}>Параметри тіла</ThemedText>
                    <TouchableOpacity onPress={handleToggleEditMetrics}>
                        {
                            metricsEdit 
                                ? <SymbolView name='pencil.slash' tintColor={'black'} size={26}/>
                                : <SymbolView name='pencil.line' tintColor={'black'} size={26}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.metricsContainer}>
                    <ViewHighlighter style={{width: 'auto', flex: 1}}>
                        <BodyMetric 
                            icon={<SymbolView name='scalemass.fill' size={24} tintColor={'#AB3600'} />}
                            value={weight} 
                            onChange={setWeight}
                            isEdit={metricsEdit}
                            unit="КГ"/>
                    </ViewHighlighter>
                    <ViewHighlighter style={{width: 'auto', flex: 1,}}>
                        <BodyMetric 
                            icon={<SymbolView name='ruler.fill' size={24} tintColor={'#0058BC'} />}
                            value={height} 
                            onChange={setHeight}
                            isEdit={metricsEdit}
                            unit="CM" />
                    </ViewHighlighter>
                    <ViewHighlighter style={{width: 'auto', flex: 1}}>
                        <BodyMetric 
                            icon={<SymbolView name='birthday.cake.fill' size={24} tintColor={'#006493'} />}
                            value={age} 
                            onChange={setAge}
                            isEdit={metricsEdit}
                            unit="РОКІВ" />
                    </ViewHighlighter>
                </View>
            </View>

            <View style={{marginTop: 32}}>
                <ThemedText type='big' style={{ fontSize: 22 }}>Налаштування</ThemedText>
                <ViewHighlighter style={{marginTop: 8, padding: 0}}>
                    <Settings list={[
                        { label: 'Акаунт', Icon: <SymbolView name='gear' size={24} tintColor={'black'}/>, onPress: handleSettings },
                    ]} />
                </ViewHighlighter>
            </View>

            <ViewHighlighter style={{marginTop: 32, padding: 0}}>
                <Button 
                    text="Вийти" 
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
    isEdit: boolean;
    onChange: (value: number) => void;
}
function BodyMetric({ value, unit, icon, isEdit, onChange }: BodyMetricProps) {
    const handleTextChange = (text: string) => {
        const val = text === '' ? 0 : Number(text)
        if (val) onChange(val)
    }

    return (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, width: '100%'}}>
            {icon}
            {
                isEdit 
                    ? <TextInput 
                        style={styles.metricText} 
                        onChangeText={handleTextChange} 
                        keyboardType='number-pad'
                        selectTextOnFocus
                        value={String(value)} />
                    : <ThemedText type='title'>{value}</ThemedText>
            }
            <ThemedText type='defaultThin' style={{marginBottom: 4}}>{unit}</ThemedText>
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
                    <ThemedText type='small'>Мета: Підтримувати Форму</ThemedText>
                </View>
            )
        case 'muscle':
            return (
                <View style={{
                    ...styles.gainContainer, 
                    backgroundColor: '#ffc8c8'
                }}>
                    <SymbolView name='figure.strengthtraining.traditional' size={24} tintColor={'black'} />
                    <ThemedText type='small'>Мета: Нарощування мʼязів</ThemedText>
                </View>
            )
        case 'fat_loss':
            return (
                <View style={{
                    ...styles.gainContainer, 
                    backgroundColor: '#bbfcc9'
                }}>
                    <SymbolView name='figure.run' size={24} tintColor={'black'} />
                    <ThemedText type='small'>Мета: Схуднути</ThemedText>
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