import { ThemedText } from '@/components/themed-text';
import ViewHighlighter from '@/components/view-highlighter';
import { useAuth } from '@/hooks/use-auth';
import { Calories, kcalCalendarType } from '@/services/MacroService';
import { GetUserCalendar, GetUserKcalTarget, LogFoodToDiary } from '@/services/diaryService';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import MacroStats from '../components/diary/MacroStats';
import MealSlot from '../components/diary/MealSlot';

export function isToday (date: Date, now: Date): boolean {  
    return date.getDate() === now.getDate() &&
         date.getMonth() === now.getMonth() &&
         date.getFullYear() === now.getFullYear()
}

const emptyCalories: Calories =
  {
    kcal: 0,
    protein: 0,
    carb: 0,
    fat: 0,
    fiber: 0,
    water: 0,
    salt: 0,
  }

const emptry_diary: kcalCalendarType = {
  date: new Date(),
  value: emptyCalories,
  breakfast: [],
  dinner: [],
  lunch: [],
  snacks: []
}

const emptyTarget: Calories = emptyCalories

export default function DiaryHome() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const navigation = useNavigation();
  const { user } = useAuth()
  const [userDiary, setUserDiary] = useState<kcalCalendarType>(emptry_diary)
  const [userTarget, setUserTarget] = useState<Calories>(emptyTarget)

  useEffect(() => {
    if (!date) return;
    
    const targetDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDateString = (d: Date) => d.toISOString().split('T')[0];

    let title = targetDate.toLocaleDateString('uk-UA', { month: 'long', day: 'numeric' });
    if (date === formatDateString(today)) title = 'Cьогодні';
    else if (date === formatDateString(yesterday)) title = 'Вчора';

    navigation.setOptions({ 
      title,
      headerTitle: title 
    });
  }, [navigation, date]);

  useEffect(() => {
    if (!user) {
      return
    }

    const today = new Date(date)
    GetUserCalendar(user.id).then(res => {
      const todayCalendar = res.find(c => isToday(c.date, today))
      if (todayCalendar) {
        setUserDiary(todayCalendar)
      }
    })

    GetUserKcalTarget(user.id).then(res => {
      if (res) {
        setUserTarget(res)
      }
    })
  }, [user])

  if (!user) {
    return (
      <ScreenWrapper>
        <ActivityIndicator size={'large'}/>
      </ScreenWrapper>
    )
  }

  const onAddMeal = (mealTitle: 'breakfast' | 'dinner' | 'lunch' | 'snacks') => {
  }

  return (
    // <View style={styles.container}>
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SUMMARY CARD */}
        <ViewHighlighter style={styles.summaryCard}>
          <MacroStats 
            value={userDiary.value} 
            target={userTarget}/>
        </ViewHighlighter>

        {/* MEALS SECTION */}
        <View style={styles.mealsSection}>
          {/* <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Meals</ThemedText> */}
          
          <MealSlot 
            key={"slot_1"}
            isEditable={false}
            title="Сніданок"
            icon={<SymbolView name='sun.and.horizon'/>}
            onAddPress={() => onAddMeal('breakfast')}
            items={userDiary.breakfast}/>

          <MealSlot 
            key={"slot_2"}
            isEditable={false}
            title="Обід"
            icon={<SymbolView name='fork.knife'/>}
            onAddPress={() => onAddMeal('lunch')}
            items={userDiary.lunch}/>

          <MealSlot 
            key={"slot_3"}
            isEditable={false}
            title="Вечеря"
            icon={<SymbolView name='moon'/>}
            onAddPress={() => onAddMeal('dinner')}
            items={userDiary.dinner}/>

          <MealSlot 
            key={"slot_4"}
            isEditable={false}
            title="Снеки"
            onAddPress={() => onAddMeal('snacks')}
            icon={<SymbolView name='carrot'/>}
            items={userDiary.snacks}/>
          
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 24,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 20,
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
  },
  circleChartPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    borderWidth: 12,
    borderColor: '#FF5F1F',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFF5F2',
  },
  circleChartText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF5F1F',
  },
  circleChartSubtext: {
    fontSize: 12,
    color: '#FF5F1F',
    opacity: 0.8,
  },
  mealsSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  mealCard: {
    padding: 16,
    borderRadius: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
  },
  addButton: {
    padding: 4,
    backgroundColor: '#FFF5F2',
    borderRadius: 8,
  },
  mealItems: {
    marginTop: 16,
    gap: 12,
  },
  mealItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 8,
  },
  mealItemName: {
    fontSize: 16,
    color: '#444',
  },
  mealItemKcal: {
    fontSize: 15,
    color: '#888',
  },
  emptyMeal: {
    marginTop: 16,
    paddingVertical: 8,
  },
  emptyMealText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
  }
});