import { ThemedText } from "@/components/themed-text";
import ViewHighlighter from "@/components/view-highlighter";
import { User } from "@/services/storageService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { SymbolView } from "expo-symbols";
import { Calories, kcalCalendarType } from "@/services/MacroService";
import { GetUserCalendar, GetUserKcalTarget } from "@/services/diaryService";
import React from "react";
import { isToday } from "../(diary)";
import { useAuth } from "@/hooks/use-auth";

const formatDateString = (date: Date) => date.toISOString().split('T')[0];
const emptyCalories: Calories =
  {
    kcal: 0,
    protein: 0,
    carb: 0,
    fat: 0
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

export default function CalendarScreen() {
  const router = useRouter();
  const { user } = useAuth(); // Assuming this comes from your context
  const scrollViewRef = useRef<ScrollView>(null);
  const isInitialScrollDone = useRef(false);
  
  // 1. Only store the source of truth in state
  const [userCalendar, setUserCalendar] = useState<kcalCalendarType[]>([]);
  
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = -13; i <= 1; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  // 2. Fetch data and force re-render with spread operator [...]
  const fetchData = async () => {
    if (!user) return;
    console.log('Fetching calendar data...');
    const res = await GetUserCalendar(user.id);
    setUserCalendar([...res]); // Creates a new array reference to ensure React re-renders
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [user])
  );

  // 3. FIXED: Added userCalendar to dependencies so the map updates!
  const dataExistsMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    userCalendar.forEach(entry => {
      map[formatDateString(entry.date)] = true;
    });
    return map;
  }, [userCalendar]);

  // 4. FIXED: Calculate streak dynamically based on the updated map
  const streak = useMemo(() => {
    const today_idx = calendarDays.length - 2;
    let currentStreak = 0;
    
    for (let i = today_idx; i > 0; i--) {
      const dateString = formatDateString(calendarDays[i]);
      if (dataExistsMap[dateString]) {
        currentStreak += 1;
      } else {
        break; // Stop counting as soon as a day is missed
      }
    }
    return currentStreak;
  }, [calendarDays, dataExistsMap]);

  // 5. FIXED: Calculate average dynamically based on updated calendar
  const avgKcal = useMemo(() => {
    if (userCalendar.length === 0) return 0;

    const targetDate = calendarDays[calendarDays.length - 2];
    const current = new Date(targetDate);
    const dayOfWeek = current.getDay(); 
    
    const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyRecords = userCalendar.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    if (weeklyRecords.length === 0) return 0;

    const totalKcal = weeklyRecords.reduce((sum, entry) => sum + entry.value.kcal, 0);
    return Math.round(totalKcal / weeklyRecords.length); // Added Math.round so you don't get ugly decimals in UI
  }, [userCalendar, calendarDays]);

  const handleDayPress = (date: Date) => {
    const dateString = formatDateString(date);
    router.push(`/(tabs)/(calendar)/${dateString}`);
  };

  const getDayName = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' });
  const getDayNumber = (date: Date) => date.getDate().toString();

  const handleLoadMorePreviousDays = () => {
    console.log("Reached the left edge! Load more past days here.");  
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX <= 0) {
      handleLoadMorePreviousDays();
    }
  };

  return (
    <ScreenWrapper style={{ padding: 0 }}>
      <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <ThemedText type="title">Progress</ThemedText>
            <ThemedText style={{...styles.instructionText, textAlign: 'left'}}>
              Track your daily calorie targets and maintain your consistency.
            </ThemedText>

            <View style={{marginTop: 32, gap: 16}}>
              {/* Average Kcal */}
              <ViewHighlighter style={styles.highlighter}>
                <View style={[styles.block, styles.blockAvg]}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}> 
                    <View style={{flexDirection: 'column', gap: 8}}>
                      <ThemedText type='small'>THIS WEEK'S AVG</ThemedText>
                      <View style={{flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
                        <ThemedText type='title' style={{ fontSize: 30 }}>{avgKcal}</ThemedText>
                        <ThemedText type='small' style={{ fontWeight: 300, marginBottom: 8 }}>kcal / day</ThemedText>
                      </View>
                    </View>
                    <SymbolView name={'flame.circle.fill'} size={64}/>
                  </View>
                </View>
              </ViewHighlighter>

              {/* Streak */}
              <ViewHighlighter style={styles.highlighter}>
                <View style={styles.block}>
                  <ThemedText type="small">CURRENT STREAK </ThemedText>
                  <View style={{width: '100%', flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
                    <ThemedText type="subtitle" style={{color: 'red'}}>{streak}</ThemedText>
                    <ThemedText type="small" style={{ fontWeight: 300, marginBottom: 3 }}>days</ThemedText>
                  </View>
                </View>
              </ViewHighlighter>

            </View>

          </View>

          {/* Horizontal Calendar Strip */}
          <View style={styles.calendarWrapper}>
            <ScrollView 
              ref={scrollViewRef}
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.calendarScroll}
              scrollEventThrottle={16}
              onContentSizeChange={() => {
                if (!isInitialScrollDone.current && scrollViewRef.current) {
                  scrollViewRef.current.scrollToEnd({ animated: false });
                  isInitialScrollDone.current = true;
                }
              }}
            >
              {calendarDays.map((date, index) => {
                const dateString = formatDateString(date);
                const hasData = dataExistsMap[dateString];
                const isToday = dateString === formatDateString(new Date());
                const isDisabled = (new Date()) < date

                return (
                  <TouchableOpacity 
                    key={index}
                    activeOpacity={0.7}
                    disabled={isDisabled}
                    onPress={() => handleDayPress(date)}
                  >
                    <ViewHighlighter style={{
                      ...styles.dayCard, 
                      ...(isToday && styles.todayCard),
                      ...(isDisabled && styles.disabledCard)
                    }}>
                      <ThemedText style={[styles.dayName, isToday && styles.todayText]}>
                        {getDayName(date)}
                      </ThemedText>
                      <ThemedText type="defaultSemiBold" style={[styles.dayNumber, isToday && styles.todayText]}>
                        {getDayNumber(date)}
                      </ThemedText>
                      
                      {/* The Blue Dot Marker */}
                      <View style={styles.dotContainer}>
                        {hasData && <View style={styles.dataDot} />}
                      </View>
                    </ViewHighlighter>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.content}>
            <ThemedText style={styles.instructionText}>
              Select a day from the calendar above to view your detailed nutrition breakdown and meal slots.
            </ThemedText>
          </View>

      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  blockAvg: {
    borderLeftColor: '#0058BC',
    borderLeftWidth: 6,
    borderRadius: 7
  },
  block: {
    padding: 16
  },
  highlighter: {
    width: 'auto',
    alignItems: 'flex-start',
    padding: 0
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  calendarWrapper: {
    height: 100,
    marginBottom: 20,
  },
  calendarScroll: {
    paddingHorizontal: 0,
    gap: 12,
    alignItems: 'center',
  },
  dayCard: {
    shadowOpacity: 0,
    width: 65,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
    borderRadius: 16,
    // paddingTop: 25
  },
  todayCard: {
    borderColor: '#FF5F1F',
    backgroundColor: '#FFF5F2',
  },
  disabledCard: {
    opacity: 0.6
  },
  dayName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
  },
  todayText: {
    color: '#FF5F1F',
  },
  dotContainer: {
    position: 'absolute',

    height: 15,
    marginTop: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dataDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    textAlign: 'center',
    color: '#888',
    lineHeight: 24,
  }
});