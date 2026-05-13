import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoalType } from "./storageService";

export const calculateDailyKcal = (
  weight: number,
  height: number,
  age: number,
  goal: GoalType,
  gender: 'male' | 'female' = 'male',
  activityLevel: number = 1.375 
): number => {
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
  
  const tdee = bmr * activityLevel;

  switch (goal) {
    case 'fat_loss':
      return Math.round(tdee * 0.8); 
    case 'muscle':
      return Math.round(tdee * 1.1); 
    case 'fit':
    default:
      return Math.round(tdee);
  }
};

export const calculateDailyProtein = (weight: number, goal: GoalType): number => {
  const multiplier = goal === 'fit' ? 1.8 : 2.2;
  return Math.round(weight * multiplier);
};


export const calculateDailyFat = (totalKcal: number): number => {
  const fatCalories = totalKcal * 0.25;
  return Math.round(fatCalories / 9); 
};


export const calculateDailyCarbs = (totalKcal: number, proteinGrams: number, fatGrams: number): number => {
  const proteinKcal = proteinGrams * 4;
  const fatKcal = fatGrams * 9;
  const remainingKcal = totalKcal - (proteinKcal + fatKcal);
  return Math.round(remainingKcal / 4);
};

export const calculateAllMacros = (
  weight: number,
  height: number,
  age: number,
  goal: GoalType
): Calories => {
  const kcal = calculateDailyKcal(weight, height, age, goal);
  const protein = calculateDailyProtein(weight, goal);
  const fat = calculateDailyFat(kcal);
  const carb = calculateDailyCarbs(kcal, protein, fat);

  return { kcal, protein, fat, carb };
};

export type Meal = {
    id: number
    name: string,
    kcal: Calories
}

export type Calories = {
    kcal: number,
    fat: number,
    protein: number,
    carb: number
}

export type kcalCalendarType = {
    date: Date,
    value: Calories // total for the day

    breakfast: Meal[]
    lunch: Meal[]
    dinner: Meal[]
    snacks: Meal[]
}

export const MOCK_MEAL: Meal[] = [
    {
        id: 1,
        name: "Apple",
        kcal: {
            kcal: 215,
            protein: 1.3,
            carb: 42,
            fat: 0
        }
    },
    {
        id: 2,
        name: "Ice Cream",
        kcal: {
            kcal: 363,
            protein: 6.1,
            carb: 132,
            fat: 21
        }
    },
    {
        id: 3,
        name: "Pasta",
        kcal: {
            kcal: 451,
            protein: 16.2,
            carb: 155,
            fat: 11
        }
    },
]