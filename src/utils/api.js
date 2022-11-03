import {users} from './_Data';

export function getAllUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve(users), 100);
    })
}