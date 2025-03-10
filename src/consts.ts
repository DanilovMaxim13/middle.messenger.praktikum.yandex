import authController from './controllers/AuthController';
import { ISignUpData } from './api/AuthApi';
import router from './services/Router';
import profileController from './controllers/ProfileController';
import { IProfile } from './api/ProfileApi';

export const SIGN_IN_PAGE_DATA = {
    title: 'Вход',
    Inputs: [
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'text',
            validate: true,
        },
        {
            id: 'password',
            label: 'Пароль',
            name: 'password',
            type: 'password',
            validate: true,
        },
    ],
    buttonText: 'Войти',
    buttonOnClick: (data: Record<string, string>) => {
        void authController.signIn(data as unknown as ISignUpData).then(res => {
            if (res === null) {
                throw new Error();
            }
            router.go('/messenger');
        });
    },
    linkText: 'Нет аккаунта?',
    linkOnClick: () => router.go('/sign-up'),
};

export const SIGN_UP_PAGE_DATA = {
    title: 'Регистрация',
    Inputs: [
        {
            id: 'email',
            label: 'Почта',
            name: 'email',
            type: 'email',
            validate: true,
        },
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'text',
            validate: true,
        },
        {
            id: 'first_name',
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            validate: true,
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            validate: true,
        },
        {
            id: 'phone',
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
            validate: true,
        },
        {
            id: 'password',
            label: 'Пароль',
            name: 'password',
            type: 'password',
            validate: true,
        },
        {
            id: 'repeat_password',
            label: 'Пароль (еще раз)',
            name: 'repeat_password',
            type: 'password',
            validate: true,
        },
    ],
    buttonText: 'Зарегистрироваться',
    buttonOnClick: (data: Record<string, string>) => {
        void authController.signUp(data as unknown as ISignUpData).then(res => {
            if (res === null) {
                throw new Error();
            }
            router.go('/messenger');
        });
    },
    linkText: 'Уже есть аккаунт?',
    linkOnClick: () => router.go('/'),
};

export const PROFILE_PAGE_DATA = {
    Inputs: [
        {
            id: 'email',
            label: 'Почта',
            disabled: true,
        },
        {
            id: 'login',
            label: 'Логин',
            disabled: true,
        },
        {
            id: 'first_name',
            label: 'Имя',
            disabled: true,
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            disabled: true,
        },
        {
            id: 'display_name',
            label: 'Имя в чате',
            disabled: true,
        },
        {
            id: 'phone',
            label: 'Телефон',
            disabled: true,
        },
    ],
    Links: [
        {
            href: '#',
            className: 'page-link profile-section__link',
            linkLabel: 'Изменить данные',
            onClick: (e: Event) => {
                e.preventDefault();
                router.go('/edit-profile');
            },
        },
        {
            href: '#',
            className: 'page-link profile-section__link',
            linkLabel: 'Изменить пароль',
            onClick: (e: Event) => {
                e.preventDefault();
                router.go('/edit-password');
            },
        },
        {
            href: '#',
            className:
                'page-link profile-section__link profile-section__link_red',
            linkLabel: 'Выйти',
            onClick: (e: Event) => {
                e.preventDefault();
                void profileController.logout().then(() => {
                    router.go('/');
                });
            },
        },
    ],
};

export const EDIT_PROFILE_PAGE_DATA = {
    Inputs: [
        {
            id: 'email',
            label: 'Почта',
            name: 'email',
            type: 'email',
            validate: true,
        },
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'login',
            validate: true,
        },
        {
            id: 'first_name',
            label: 'Имя',
            name: 'first_name',
            type: 'first_name',
            validate: true,
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            name: 'second_name',
            type: 'second_name',
            validate: true,
        },
        {
            id: 'display_name',
            label: 'Имя в чате',
            name: 'display_name',
            type: 'display_name',
            validate: true,
        },
        {
            id: 'phone',
            label: 'Телефон',
            name: 'phone',
            type: 'phone',
            validate: true,
        },
    ],
    buttonText: 'Сохранить',
    buttonOnClick: (data: Record<string, string>) => {
        void profileController.updateProfile(data as IProfile).then(res => {
            if (res === null) {
                throw new Error();
            }
            router.go('/settings');
        });
    },
};

export const EDIT_PASSWORD_PAGE_DATA = {
    Inputs: [
        {
            id: 'oldPassword',
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            validate: true,
        },
        {
            id: 'newPassword',
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            validate: true,
        },
        {
            id: 'repeatPassword',
            label: 'Повторите новый пароль',
            name: 'repeatPassword',
            type: 'password',
            validate: true,
        },
    ],
    buttonText: 'Сохранить',
    buttonOnClick: (data: Record<string, string>) => {
        void profileController
            .changePassword(data.oldPassword, data.newPassword)
            .then(res => {
                if (res === null) {
                    throw new Error();
                }
                router.go('/settings');
            });
    },
};
