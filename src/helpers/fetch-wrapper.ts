
import { userService } from '@/services';

const { publicRuntimeConfig } = process.env

export const fetchWrapper = {
    get,
    post
};

function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any) {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: "include",
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}


// helper functions

function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig && JSON.parse(publicRuntimeConfig).apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return undefined;
    }
}

function handleResponse(response: { text: () => Promise<any>; ok: any; status: number; statusText: any; }) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}