import { HTTPTransport } from '../services/HTTPTransport';
import { BaseAPI } from './BaseApi';

export interface ISignInData {
    login: string;
    password: string;
}

export interface ISignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface IUserData {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

class AuthAPI extends BaseAPI {
    private http = new HTTPTransport();

    signIn(userData: ISignInData) {
        return this.http.post('/auth/signin', { data: userData });
    }

    signUp(userData: ISignUpData) {
        return this.http.post('/auth/signup', { data: userData });
    }

    getUser() {
        return this.http.get('/auth/user');
    }
}

export default new AuthAPI();
