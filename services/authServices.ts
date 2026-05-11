import { AddUser, GetAllUsers, UpdateUser, User } from "./storageService";

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
                        height: 67,
                        age: 67,
                        goal: 'fat_loss',
                    };
                    await AddUser(newUser);
                    resolve(newUser);
                }
            }, 1000);
        })
    },
    updateUser: async(user: User): Promise<User | null> => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const userToUpdate = await GetAllUsers().then(users => users.find(u => u.id === user.id));
                if (!userToUpdate) {
                    resolve(null);
                    return;
                }
                const success = await UpdateUser({...userToUpdate, ...user});
                resolve(success);
            }, 1);
        });
    }
}