import Button from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import { Meal, MOCK_MEAL } from "@/services/MacroService";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { default as React, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useDiaryContext } from "./context";

export default function DiaryPicker() {
    const { headerTitle } = useLocalSearchParams()
    const navigation = useNavigation()
    const { setSelectedFood } = useDiaryContext();
    const [selected, setSelected] = React.useState<string[]>([])

    useEffect(() => {
        navigation.setOptions({ 
            title: headerTitle,
            headerTitle: headerTitle 
        });
    }, [headerTitle])

    const handleFoodPress = (name: string) => {
        console.log('select: ' + name)
        if (selected.includes(name)) {
            setSelected(selected.filter(e => e != name))
        } else {
            setSelected([...selected, name])
        }
    }

    const handleAddFood = () => {
        setSelectedFood(
            selected.map(sel => {
                const to_add = MOCK_MEAL.find(e => e.name === sel)
                return to_add || {} as Meal
            })
        )
        router.back()
    }

    return (
            <ScreenWrapper style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <ThemedText type='subtitle'>Pick here!</ThemedText>
                    {
                        MOCK_MEAL.map((food, idx) => (
                            <TouchableOpacity onPress={() => handleFoodPress(food.name)} key={'food_touch_' + idx}>
                                <FoodElem food={food} isSelected={selected.includes(food.name)}/>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <Button 
                    text='Add food' 
                    style={{ width: '100%', backgroundColor: '#FF5F1F' }} 
                    textStyle={{color: "white"}}
                    onClick={handleAddFood}
                    />
            </ScreenWrapper>
    )
}

const FoodElem = ({ food, isSelected = false }: { food: Meal, isSelected?: boolean }) => {
    return (
        
            <View style={{
                ...styles.mealItemRow,
                ...(isSelected ? styles.foodElemSelected : {})   
            }} key={food.name}>
                <View>
                    <ThemedText type='defaultSemiBold' style={{ fontSize: 14 }}>{food.name}</ThemedText>
                    {/* <ThemedText ={'small'}></ThemedText> */}
                    <ThemedText type='small' style={{ color: '#888' }}>
                        P: {food.kcal.protein} • C: {food.kcal.carb} • F: {food.kcal.fat}
                    </ThemedText>
                </View>
                <ThemedText style={styles.mealItemKcal}>{food.kcal.kcal} kcal</ThemedText>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
mealItems: {
    marginTop: 16,
    gap: 12,
  },
  mealItemRow: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  mealItemKcal: {
    fontSize: 15,
    color: '#888',
  },
    foodElemSelected: {
        backgroundColor: '#f9eeee',
    }
})