import Authorization from './pages/Authorization';
import MessengerPage from './pages/MessengerPage';
import Profile from './pages/Profile';

import router from './services/Router';
import {
    EDIT_PASSWORD_PAGE_DATA,
    EDIT_PROFILE_PAGE_DATA,
    PROFILE_PAGE_DATA,
    SIGN_IN_PAGE_DATA,
    SIGN_UP_PAGE_DATA,
} from './consts';

import './main.style.pcss';

document.addEventListener('DOMContentLoaded', () => {
    router
        .use('/', Authorization, SIGN_IN_PAGE_DATA)
        .use('/sign-up', Authorization, SIGN_UP_PAGE_DATA)
        .use('/settings', Profile, PROFILE_PAGE_DATA)
        .use('/edit-profile', Profile, EDIT_PROFILE_PAGE_DATA)
        .use('/edit-password', Profile, EDIT_PASSWORD_PAGE_DATA)
        .use('/messenger', MessengerPage)
        .start();
});
