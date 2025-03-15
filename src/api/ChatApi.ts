import HTTPTransport from '../services/HTTPTransport';
import { BaseAPI } from './BaseApi';

class ChatAPI extends BaseAPI {
    private http = new HTTPTransport();

    getChats() {
        return this.http.get('/chats');
    }

    create(title: string) {
        return this.http.post('/chats', { data: { title } });
    }

    getToken(chatId: number) {
        return this.http.post(`/chats/token/${chatId}`);
    }

    setChatAvatar(formData: FormData) {
        return this.http.put('/chats/avatar', { data: formData });
    }

    searchUser(login: string) {
        return this.http.post('/user/search', { data: { login: login } });
    }

    addRemoveUsers(chatId: number, users: number[], add: boolean) {
        if (add) {
            return this.http.put('/chats/users', {
                data: { chatId, users },
            });
        }
        return this.http.delete('/chats/users', {
            data: { chatId, users },
        });
    }

    delete(chatId: number) {
        return this.http.delete('/chats', { data: { chatId } });
    }
}

export default new ChatAPI();
