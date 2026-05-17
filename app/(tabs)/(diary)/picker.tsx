import Button from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import { Meal, MOCK_MEAL } from "@/services/MacroService";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { default as React, useEffect } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useDiaryContext } from "./context";
import { Colors } from "@/constants/theme";
import { SymbolView } from "expo-symbols";

const enToUaTitle = (enTitle: string | string[]): string => {
    switch(enTitle) {
        case "breakfast":
            return 'Сніданок'
        case 'lunch':
            return 'Обід'
        case 'dinner':
            return 'Вечеря'
        case 'snacks':
            return 'Cнеки'
    }
    return ""
}

const isMealSearched = (search: string, meal: Meal): boolean => {
    const strSimplifu = (str: string): string => {
        return str.toLowerCase().trim().replaceAll(' ', '')
    }

    return strSimplifu(meal.name).includes(strSimplifu(search))
}

export default function DiaryPicker() {
    const { headerTitle } = useLocalSearchParams();
    const navigation = useNavigation();
    const { setSelectedFood } = useDiaryContext();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [searchText, setSearchText] = React.useState<string | undefined>(undefined)
    const [filteredItems, setFilteredItems] = React.useState<Meal[]>([])

    useEffect(() => {
        navigation.setOptions({ 
            title: enToUaTitle(headerTitle),
            headerTitle: enToUaTitle(headerTitle) 
        });
    }, [headerTitle]);

    useEffect(() => {
        if (searchText == undefined) {
            return
        }

        if (searchText === '') {
            setFilteredItems([])
            return
        }

        setFilteredItems(
            MOCK_MEAL.filter(e => isMealSearched(searchText, e))
        )
    }, [searchText])

    const handleFoodPress = (name: string) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(e => e !== name));
        } else {
            setSelected([...selected, name]);
        }
    };

    const handleAddFood = () => {
        setSelectedFood(
            selected.map(sel => {
                const to_add = MOCK_MEAL.find(e => e.name === sel);
                return to_add || {} as Meal;
            })
        );
        router.back();
    };

    const handleClearInput = () => {
        setSearchText('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <ThemedText type='subtitle' style={styles.title}>Клікни, щоб обрати!</ThemedText>
                <View style={{width: '100%'}}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Пошук..." 
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={handleClearInput}>
                        <SymbolView 
                            name={'xmark.circle'} 
                            style={styles.closeInput} 
                            tintColor={'#2b2727'}
                            size={20}/>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {
                    filteredItems.length === 0 ? (
                        MOCK_MEAL.map((food, idx) => (
                            <TouchableOpacity 
                                onPress={() => handleFoodPress(food.name)} 
                                key={'food_touch_' + idx}
                            >
                                <FoodElem food={food} isSelected={selected.includes(food.name)}/>
                            </TouchableOpacity>
                        )) 
                    ) : (
                        filteredItems.map((food, idx) => (
                            <TouchableOpacity 
                                onPress={() => handleFoodPress(food.name)} 
                                key={'food_touch_' + idx}
                                activeOpacity={0.7}
                            >
                                <FoodElem food={food} isSelected={selected.includes(food.name)}/>
                            </TouchableOpacity>
                        ))
                    )
                }
            </ScrollView>

            <View style={styles.footer}>
                <Button 
                    text='Додати' 
                    style={styles.addButton} 
                    textStyle={{ color: "white", fontWeight: 'bold' }}
                    onClick={handleAddFood}
                />
            </View>
        </View>
    );
}

const FoodElem = ({ food, isSelected = false }: { food: Meal, isSelected?: boolean }) => {
    return (
        <View style={[
            styles.mealItemRow,
            isSelected && styles.foodElemSelected
        ]}>
            <View>
                <ThemedText type='defaultSemiBold' style={{ fontSize: 15 }}>{food.name}</ThemedText>
                <ThemedText type='small' style={{ color: '#888', marginTop: 4 }}>
                    P: {food.kcal.protein} • C: {food.kcal.carb} • F: {food.kcal.fat}
                </ThemedText>
            </View>
            <ThemedText style={styles.mealItemKcal}>{food.kcal.kcal} kcal</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.light.background,
    },
    headerSection: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    title: {
        marginBottom: 12,
    },
    closeInput: {
        position: 'absolute',
        right: 14,
        bottom: 12
    },
    searchInput: {
        width: '100%',
        height: 44,
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        paddingRight: 40
    },
    scrollView: {
        flex: 1, 
        width: '100%',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20, 
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 20,
        backgroundColor: Colors.light.background,
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    addButton: {
        width: '100%', 
        backgroundColor: '#FF5F1F',
        borderRadius: 12,
        alignItems: 'center',
    },
    mealItemRow: {
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        padding: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    mealItemKcal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
    },
    foodElemSelected: {
        backgroundColor: '#ffe5dd90'
        // borderColor: '#FF5F1F',
        // borderWidth: 1,
    }
});