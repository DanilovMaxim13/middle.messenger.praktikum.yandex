import authApi, { ISignInData, ISignUpData } from '../api/AuthApi';
import store from '../services/Store';

class UserAuthController {
    public async signIn(
        data: ISignInData
    ): Promise<Promise<null | undefined> | void> {
        try {
            const res = (await authApi.signIn(data)) as XMLHttpRequest;
            if (res.status !== 200) {
                return null;
            }
            const user = await this.getUser();
            if (user) {
                const userData = JSON.parse(user.responseText);
                store.set('user', userData);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }

    public async signUp(data: ISignUpData) {
        try {
            await authApi.signUp(data);
            const user = await this.getUser();

            if (user) {
                const userData = JSON.parse(user.responseText);
                store.set('user', userData);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    }

    async getUser(): Promise<XMLHttpRequest | undefined> {
        try {
            return (await authApi.getUser()) as XMLHttpRequest | undefined;
        } catch (error) {
            console.error('Error fetching user:', error);
            return undefined;
        }
    }
}

export default new UserAuthController();
