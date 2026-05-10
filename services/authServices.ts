import { AddUser, GetAllUsers, User } from "./storageService";

export const authService = {
    login: async(email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const users = await GetAllUsers();
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    },
    register: async(email: string, password: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const users = await GetAllUsers();
                const user = users.find(u => u.email === email);
                if (user) {
                    reject(new Error('Email already in use'));
                } else {
                    const newUser: User = {
                        id: (users.length + 1).toString(),
                        name: email.split('@')[0],
                        email,
                        password,
                        iconUrl: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
                        weight: 67,
                        weightTarget: 67,
                        fat: 67,
                        fatTarget: 12,
                        goal: 'fat_loss',
                    };
                    await AddUser(newUser);
                    resolve(newUser);
                }
            }, 1000);
        })
    }
}