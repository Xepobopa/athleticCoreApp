import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_USERS = 'users';
const KEY_AUTHED_USER = 'authed_user';
export type GoalType = 'muscle' | 'fat_loss' | 'fit';

export type Calories = {
    kcal: number,
    fat: number,
    protein: number,
    carb: number
}

export type kcalCalendarType = {
    date: Date,
    value: Calories
}

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

    kcalPerDay: Calories;
    kcalCalendar: number[]
}

const mockUsers: User[] = [
    {id: "1", name: "Mike Mentzer", email: "mike@example.com", password: "mike", goal: "muscle", iconUrl: "https://thebarbell.com/wp-content/uploads/2023/02/Mike-Mentzer-workout-4.jpg", weight: 70, height: 175, age: 23},
    {id: "2", name: "Tom Platz", email: "tom@example.com", password: "tom", goal: "fat_loss", iconUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/tq3rbYYrmBu1KT1MQhmRVUHwUQH.jpg", weight: 105, height: 180, age: 25},
]

// one time add mock users to the storage
export async function CheckAndAddMockUsers() {
    const users = await GetAllUsers();
    if (users.length === 0) {
        await AsyncStorage.setItem(KEY_USERS, JSON.stringify(mockUsers));
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