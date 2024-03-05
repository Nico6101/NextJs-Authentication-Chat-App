import fs from 'fs'

// users in JSON file for simplicity, store in a db for production applications
import dbData from '@/data/users.json'
import { User } from '../types/userModel';

let users: any[] = dbData;

export const usersRepo = {
    getAll: () => users,
    getById: (id: number) => users.find(x => x.id.toString() === id.toString()),
    find: (x: any) => users.find(x),
    create,
    update,
    delete: _delete
};

function create(user: User) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

function update(id: number, params: any) {
    const user = users.find(x => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('src/data/users.json', JSON.stringify(users, null, 4));
}