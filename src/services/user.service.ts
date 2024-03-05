// 'use server'

import { BehaviorSubject } from 'rxjs';
import { useRouter } from 'next/router';

import { fetchWrapper } from '@/helpers';
import { User } from '@/helpers/types/userModel';

const apiUrl = "http://localhost:3000";

const baseUrl = `${apiUrl}/api`;

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user') || "{}"));

export const userService = {
    userSubject,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    register,
};

function login(email: string, password: string) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
}

function register(user: User) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}
