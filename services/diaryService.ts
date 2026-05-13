import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, kcalCalendarType, Calories } from "./MacroService"; 

export const PREFIX_CALENDAR = 'user_calendar_';
export const PREFIX_KCAL_TARGET = 'user_kcal_per_day_';


export async function SetUserKcalTarget(userId: string, target: Calories): Promise<void> {
    const key = `${PREFIX_KCAL_TARGET}${userId}`;
    await AsyncStorage.setItem(key, JSON.stringify(target));
}

export async function GetUserKcalTarget(userId: string): Promise<Calories | null> {
    const key = `${PREFIX_KCAL_TARGET}${userId}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) as Calories : null;
}

export async function GetUserCalendar(userId: string): Promise<kcalCalendarType[]> {
    const key = `${PREFIX_CALENDAR}${userId}`;
    try {
        const data = await AsyncStorage.getItem(key);
        if (data) {
            const parsed = JSON.parse(data) as kcalCalendarType[];
            return parsed.map(day => ({
                ...day,
                date: new Date(day.date)
            }));
        }
        return [];
    } catch (e) {
        console.log(`Error fetching calendar for user ${userId}`, e);
        return [];
    }
}

export async function SaveUserCalendar(userId: string, calendar: kcalCalendarType[]): Promise<void> {
    const key = `${PREFIX_CALENDAR}${userId}`;
    await AsyncStorage.setItem(key, JSON.stringify(calendar));
}

export async function LogFoodToDiary(
    userId: string, 
    targetDate: Date, 
    mealToLog: Meal, 
    mealSlot: 'breakfast' | 'lunch' | 'dinner' | 'snacks'
): Promise<void> {
    
    const calendar = await GetUserCalendar(userId);
    const dateString = targetDate.toISOString().split('T')[0];
    
    const dayIndex = calendar.findIndex(d => d.date.toISOString().split('T')[0] === dateString);
    
    if (dayIndex !== -1) {
        calendar[dayIndex][mealSlot].push(mealToLog);
        
        calendar[dayIndex].value.kcal += mealToLog.kcal.kcal;
        calendar[dayIndex].value.protein += mealToLog.kcal.protein;
        calendar[dayIndex].value.carb += mealToLog.kcal.carb;
        calendar[dayIndex].value.fat += mealToLog.kcal.fat;
    } else {
        const newDay: kcalCalendarType = {
            date: targetDate,
            value: { ...mealToLog.kcal },
            breakfast: mealSlot === 'breakfast' ? [mealToLog] : [],
            lunch: mealSlot === 'lunch' ? [mealToLog] : [],
            dinner: mealSlot === 'dinner' ? [mealToLog] : [],
            snacks: mealSlot === 'snacks' ? [mealToLog] : []
        };
        calendar.push(newDay);
    }
    await SaveUserCalendar(userId, calendar);
}