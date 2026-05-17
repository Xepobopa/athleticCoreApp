import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calories, kcalCalendarType, Meal, MOCK_MEAL } from "./MacroService";
import { GetUserCalendar, GetUserKcalTarget, SaveUserCalendar, SetUserKcalTarget } from "./diaryService";

const KEY_USERS = 'users';
const KEY_AUTHED_USER = 'authed_user';
export type GoalType = 'muscle' | 'fat_loss' | 'fit';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;

    weight: number;
    height: number;
    age: number;

    goal: GoalType;
    iconUrl: string;
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const mockUsers: User[] = [
    {id: "1", name: "Mike Mentzer", email: "mike@example.com", password: "mike", goal: "muscle", iconUrl: "https://thebarbell.com/wp-content/uploads/2023/02/Mike-Mentzer-workout-4.jpg", weight: 70, height: 175, age: 23},
    {id: "2", name: "Tom Platz", email: "tom@example.com", password: "tom", goal: "fat_loss", iconUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/tq3rbYYrmBu1KT1MQhmRVUHwUQH.jpg", weight: 105, height: 180, age: 25 },
]

const test_diary: kcalCalendarType = {
  date: new Date(),
  value: {
    kcal: 1234,
    protein: 123,
    carb: 123,
    fat: 123,
    salt: 6,
    water: 3500,
    fiber: 35
  },
  breakfast: [MOCK_MEAL[0], MOCK_MEAL[1]],
  dinner: [],
  lunch: [],
  snacks: []
}
const test_kcal_target: Calories =  {
    kcal: 2500,
    protein: 160,
    carb: 280,
    fat: 70,
    salt: 6,
    water: 3500,
    fiber: 35
}

// one time add mock users to the storage
export async function CheckAndAddMockUsers() {
    let users = await GetAllUsers();
    if (users.length === 0) {
        await AsyncStorage.setItem(KEY_USERS, JSON.stringify(mockUsers));
        
        users = await GetAllUsers();
        // also add diary
        for (const usr of users) {
            const diary = await GetUserCalendar(usr.id)
            if (!diary) {
                SaveUserCalendar(usr.id, [test_diary])
            }

            const target = await GetUserKcalTarget(usr.id)
            if (!target) {
                await SetUserKcalTarget(usr.id, test_kcal_target)
            }
        }
    }
}

export async function GetAllUsers(): Promise<User[]> {
    return AsyncStorage.getItem(KEY_USERS).then(users => {
        return users ? JSON.parse(users) as User[] : []; 
    }).catch(e => {
        console.log('Error fetching users', e);
        return [];
    })
}

export async function AddUser(user: User) {
    const users = await GetAllUsers();
    users.push(user);
    await AsyncStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export async function UpdateUser(user: User): Promise<User | null> {
    const users = await GetAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
        await AsyncStorage.setItem(KEY_USERS, JSON.stringify(users));
        return user;
    } else {
        console.log('User not found for update', user);
        return null;
    }
}

// stores only id
export async function SetAuthedUser(user: User) {
    await AsyncStorage.setItem(KEY_AUTHED_USER, user.id);
}

export async function GetAuthedUser(): Promise<User | null> {
    const userId = await AsyncStorage.getItem(KEY_AUTHED_USER);
    if (userId) {
        const users = await GetAllUsers();
        return users.find(u => u.id === userId) || null;
    }
    return null;
}

export async function ClearAuthedUser() {
    await AsyncStorage.removeItem(KEY_AUTHED_USER);
}

export async function ClearAllData() {
    await AsyncStorage.clear();
}

