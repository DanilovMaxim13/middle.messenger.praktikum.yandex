import { HTTPTransport } from '../services/HTTPTransport';
import { BaseAPI } from './BaseApi';

export interface IProfile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    [index: string]: string;
}
class ProfileAPI extends BaseAPI {
    private http = new HTTPTransport();

    update({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
    }: IProfile) {
        return this.http.put('/user/profile', {
            data: {
                first_name,
                second_name,
                display_name,
                login,
                email,
                phone,
            },
        });
    }

    updatePassword(oldPassword: string, newPassword: string) {
        return this.http.put('/user/password', {
            data: { oldPassword, newPassword },
        });
    }

    updateAvatar(formData: FormData) {
        return this.http.put('/user/profile/avatar', {
            data: formData,
        });
    }

    logout() {
        return this.http.post('/auth/logout');
    }
}

export default new ProfileAPI();
