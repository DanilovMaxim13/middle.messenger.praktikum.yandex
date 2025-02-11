export const SIGN_IN_PAGE_DATA = {
    title: 'Вход',
    Inputs: [
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'text',
        },
        {
            id: 'password',
            label: 'Пароль',
            name: 'password',
            type: 'password',
        },
    ],
    buttonText: 'Войти',
    linkText: 'Нет аккаунта?',
};

export const SIGN_UP_PAGE_DATA = {
    title: 'Регистрация',
    Inputs: [
        {
            id: 'email',
            label: 'Почта',
            name: 'email',
            type: 'email',
        },
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'text',
        },
        {
            id: 'first_name',
            label: 'Имя',
            name: 'first_name',
            type: 'text',
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
        },
        {
            id: 'phone',
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
        },
        {
            id: 'password',
            label: 'Пароль',
            name: 'password',
            type: 'password',
        },
        {
            id: 'repeat_password',
            label: 'Пароль (еще раз)',
            name: 'repeat_password',
            type: 'password',
        },
    ],
    buttonText: 'Зарегистрироваться',
    linkText: 'Уже есть аккаунт?',
};

export const PROFILE_PAGE_DATA = {
    Inputs: [
        {
            id: 'email',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            disabled: true,
        },
        {
            id: 'login',
            label: 'Логин',
            value: 'ivanivanov',
            disabled: true,
        },
        {
            id: 'first_name',
            label: 'Имя',
            value: 'Иван',
            disabled: true,
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            disabled: true,
        },
        {
            id: 'display_name',
            label: 'Имя в чате',
            value: 'Иван',
            disabled: true,
        },
        {
            id: 'phone',
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
            disabled: true,
        },
    ],
    Links: [
        {
            href: '#',
            className: 'page-link profile-section__link',
            linkLabel: 'Изменить данные',
        },
        {
            href: '#',
            className: 'page-link profile-section__link',
            linkLabel: 'Изменить пароль',
        },
        {
            href: '#',
            className:
                'page-link profile-section__link profile-section__link_red',
            linkLabel: 'Выйти',
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
            value: 'pochta@yandex.ru',
        },
        {
            id: 'login',
            label: 'Логин',
            name: 'login',
            type: 'login',
            value: 'ivanivanov',
        },
        {
            id: 'first_name',
            label: 'Имя',
            name: 'first_name',
            type: 'first_name',
            value: 'Иван',
        },
        {
            id: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            name: 'second_name',
            type: 'second_name',
        },
        {
            id: 'display_name',
            label: 'Имя в чате',
            name: 'display_name',
            type: 'display_name',
            value: 'Иван',
        },
        {
            id: 'phone',
            label: 'Телефон',
            name: 'phone',
            type: 'phone',
            value: '+7 (909) 967 30 30',
        },
    ],
    buttonText: 'Сохранить',
};

export const EDIT_PASSWORD_PAGE_DATA = {
    Inputs: [
        {
            id: 'oldPassword',
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
        },
        {
            id: 'newPassword',
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
        },
        {
            id: 'newPassword',
            label: 'Повторите новый пароль',
            name: 'newPassword',
            type: 'password',
        },
    ],
    buttonText: 'Сохранить',
};
