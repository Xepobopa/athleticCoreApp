import { GoalType } from "./storageService";

export const ActivityLevel = {
  SEDENTARY: 1.2,       
  LIGHT: 1.375,         
  MODERATE: 1.55,       
  HIGH: 1.725,          
  EXTRA_ACTIVE: 1.9
} as const;
export type ActivityLevelType = typeof ActivityLevel[keyof typeof ActivityLevel];

export const calculateDailyKcal = (
  weight: number,
  height: number,
  age: number,
  goal: GoalType,
  gender: 'male' | 'female' = 'male',
  activityLevel: ActivityLevelType = ActivityLevel.SEDENTARY
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

export const calculateDailyFiber = (dailyKcal: number): number => {
  return Math.round((dailyKcal / 1000) * 14); 
};

export const calculateDailyWaterMl = (
  weight: number, 
  trainingDurationHours: number = 0
): number => {
  const baseWater = weight * 35;
  const trainingWater = trainingDurationHours * 750;
  
  return Math.round(baseWater + trainingWater);
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
  const fiber = calculateDailyFiber(kcal)
  const water = calculateDailyWaterMl(weight, 1.5)

  // salt is a constant for everyone - 5gram
  return { kcal, protein, fat, carb, fiber, water, salt: 5 };
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
    carb: number,

    salt: number,
    water: number,
    fiber: number
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
    id: 5,
    name: "Куряче філе (сире)",
    kcal: { kcal: 110, protein: 23, carb: 0, fat: 1.2, water: 74, salt: 0.1, fiber: 0 }
  },
  {
    id: 6,
    name: "Лосось (запечений)",
    kcal: { kcal: 206, protein: 22, carb: 0, fat: 13, water: 64, salt: 0.15, fiber: 0 }
  },
  {
    id: 7,
    name: "Яловичина (стейк)",
    kcal: { kcal: 250, protein: 26, carb: 0, fat: 15, water: 58, salt: 0.1, fiber: 0 }
  },
  {
    id: 8,
    name: "Сало",
    kcal: { kcal: 797, protein: 2.4, carb: 0, fat: 89, water: 6, salt: 2.5, fiber: 0 }
  },
  {
    id: 9,
    name: "Гречка (варена)",
    kcal: { kcal: 130, protein: 4.5, carb: 26, fat: 1.1, water: 68, salt: 0.01, fiber: 2.7 }
  },
  {
    id: 10,
    name: "Рис білий (варений)",
    kcal: { kcal: 130, protein: 2.7, carb: 28, fat: 0.3, water: 68, salt: 0.01, fiber: 0.4 }
  },
  {
    id: 11,
    name: "Макарони (відварені)",
    kcal: { kcal: 158, protein: 5.8, carb: 31, fat: 0.9, water: 62, salt: 0.01, fiber: 1.8 }
  },
  {
    id: 12,
    name: "Картопляне пюре",
    kcal: { kcal: 88, protein: 2, carb: 15, fat: 3, water: 78, salt: 0.8, fiber: 1.5 }
  },
  {
    id: 13,
    name: "Банан",
    kcal: { kcal: 89, protein: 1.1, carb: 23, fat: 0.3, water: 74, salt: 0.01, fiber: 2.6 }
  },
  {
    id: 14,
    name: "Авокадо",
    kcal: { kcal: 160, protein: 2, carb: 8.5, fat: 15, water: 73, salt: 0.01, fiber: 6.7 }
  },
  {
    id: 15,
    name: "Помідор",
    kcal: { kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2, water: 94, salt: 0.01, fiber: 1.2 }
  },
  {
    id: 16,
    name: "Огірок",
    kcal: { kcal: 15, protein: 0.7, carb: 3.6, fat: 0.1, water: 95, salt: 0.01, fiber: 0.5 }
  },
  {
    id: 17,
    name: "Броколі (варена)",
    kcal: { kcal: 35, protein: 2.4, carb: 7.2, fat: 0.4, water: 89, salt: 0.04, fiber: 3.3 }
  },
  {
    id: 18,
    name: "Яйце куряче (варене)",
    kcal: { kcal: 155, protein: 13, carb: 1.1, fat: 11, water: 75, salt: 0.3, fiber: 0 }
  },
  {
    id: 19,
    name: "Сир кисломолочний 5%",
    kcal: { kcal: 121, protein: 17, carb: 1.8, fat: 5, water: 75, salt: 0.1, fiber: 0 }
  },
  {
    id: 20,
    name: "Твердий сир",
    kcal: { kcal: 350, protein: 26, carb: 0, fat: 26, water: 40, salt: 1.5, fiber: 0 }
  },
  {
    id: 21,
    name: "Кефір 2.5%",
    kcal: { kcal: 50, protein: 2.8, carb: 4, fat: 2.5, water: 89, salt: 0.1, fiber: 0 }
  },
  {
    id: 22,
    name: "Чорний шоколад",
    kcal: { kcal: 546, protein: 4.9, carb: 61, fat: 31, water: 1, salt: 0.02, fiber: 7 }
  },
  {
    id: 23,
    name: "Мигдаль (горіхи)",
    kcal: { kcal: 579, protein: 21, carb: 21, fat: 49, water: 4, salt: 0.01, fiber: 12.5 }
  },
  {
    id: 24,
    name: "Вареники з картоплею",
    kcal: { kcal: 220, protein: 5.5, carb: 36, fat: 6, water: 50, salt: 1.2, fiber: 1.8 }
  },
  {
    id: 25,
    name: "Вівсянка (суха)",
    kcal: { kcal: 389, protein: 16.9, carb: 66, fat: 6.9, water: 8, salt: 0.01, fiber: 10.6 }
  },
  {
    id: 26,
    name: "Борщ (100 г)",
    kcal: { kcal: 45, protein: 1.6, carb: 4.5, fat: 2.1, water: 89, salt: 0.8, fiber: 1.2 }
  },
  {
    id: 27,
    name: "Борщ (порція 300 г)",
    kcal: { kcal: 135, protein: 4.8, carb: 13.5, fat: 6.3, water: 267, salt: 2.4, fiber: 3.6 }
  },
  {
    id: 28,
    name: "Плов з куркою (100 г)",
    kcal: { kcal: 185, protein: 7.5, carb: 22, fat: 7.2, water: 61, salt: 1.1, fiber: 1.5 }
  },
  {
    id: 29,
    name: "Плов з куркою (250 г)",
    kcal: { kcal: 462, protein: 18.7, carb: 55, fat: 18, water: 152, salt: 2.7, fiber: 3.7 }
  },
  {
    id: 30,
    name: "Пельмені з м'ясом (100 г)",
    kcal: { kcal: 275, protein: 12, carb: 28, fat: 12, water: 45, salt: 1.5, fiber: 1.1 }
  },
  {
    id: 31,
    name: "Пельмені з м'ясом (200 г)",
    kcal: { kcal: 550, protein: 24, carb: 56, fat: 24, water: 90, salt: 3.0, fiber: 2.2 }
  },
  {
    id: 32,
    name: "Салат Цезар (100 г)",
    kcal: { kcal: 150, protein: 10, carb: 5, fat: 10, water: 72, salt: 0.9, fiber: 1.5 }
  },
  {
    id: 33,
    name: "Салат Цезар (250 г)",
    kcal: { kcal: 375, protein: 25, carb: 12.5, fat: 25, water: 180, salt: 2.2, fiber: 3.7 }
  },
  {
    id: 34,
    name: "Вода питна (100 мл)",
    kcal: { kcal: 0, protein: 0, carb: 0, fat: 0, water: 100, salt: 0, fiber: 0 }
  },
  {
    id: 35,
    name: "Вода питна (250 мл)",
    kcal: { kcal: 0, protein: 0, carb: 0, fat: 0, water: 250, salt: 0, fiber: 0 }
  },
  {
    id: 36,
    name: "Вода питна (500 мл)",
    kcal: { kcal: 0, protein: 0, carb: 0, fat: 0, water: 500, salt: 0, fiber: 0 }
  },
  {
    id: 37,
    name: "Вода питна (1 літр)",
    kcal: { kcal: 0, protein: 0, carb: 0, fat: 0, water: 1000, salt: 0, fiber: 0 }
  },
  {
    id: 38,
    name: "Вода питна (1.5 літра)",
    kcal: { kcal: 0, protein: 0, carb: 0, fat: 0, water: 1500, salt: 0, fiber: 0 }
  },
  {
    id: 39,
    name: "Капучино (чашка 200 мл)",
    kcal: { kcal: 74, protein: 3.4, carb: 5, fat: 4.4, water: 185, salt: 0.1, fiber: 0 }
  },
  {
    id: 40,
    name: "Сік яблучний (250 мл)",
    kcal: { kcal: 115, protein: 0.2, carb: 28, fat: 0.2, water: 220, salt: 0.01, fiber: 0.5 }
  },
  {
    id: 41,
    name: "Coca-Cola (330 мл)",
    kcal: { kcal: 139, protein: 0, carb: 35, fat: 0, water: 295, salt: 0.03, fiber: 0 }
  },
]