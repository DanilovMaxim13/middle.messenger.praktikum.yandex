import Handlebars from 'handlebars';

import { Authorization } from './pages/Authorization';
import { ErrorPage } from './pages/ErrorPage';
import { Profile } from './pages/Profile';

import { Avatar } from './components/Avatar';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Link } from './components/Link';
import { NavBar } from './components/NavBar';
import { ProfileRow } from './components/ProfileRow';

import {
    EDIT_PASSWORD_PAGE_DATA,
    EDIT_PROFILE_PAGE_DATA,
    PROFILE_PAGE_DATA,
    SIGN_IN_PAGE_DATA,
    SIGN_UP_PAGE_DATA
} from './consts.js';

Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('NavBar', NavBar);
Handlebars.registerPartial('ProfileRow', ProfileRow);

class App {
    constructor() {
        this.state = {
            currentPage: window.location.pathname,
        }
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        switch (this.state.currentPage) {
            case '/':
            case '/ChatPage':
                template = Handlebars.compile(ErrorPage);
                this.appElement.innerHTML = template({errorCode: '404', errorDescription: 'Данная страница будет готова во 2-м спринте'});
                break;
            case '/404':
                template = Handlebars.compile(ErrorPage);
                this.appElement.innerHTML = template({errorCode: '404', errorDescription: 'Не туда попали'});
                break;
            case '/500':
                template = Handlebars.compile(ErrorPage);
                this.appElement.innerHTML = template({errorCode: '500', errorDescription: 'Мы уже фиксим'});
                break;
            case '/Profile':
                template = Handlebars.compile(Profile);
                this.appElement.innerHTML = template(PROFILE_PAGE_DATA);
                break;
            case '/EditProfile':
                template = Handlebars.compile(Profile);
                this.appElement.innerHTML = template(EDIT_PROFILE_PAGE_DATA);
                break;
            case '/EditPassword':
                template = Handlebars.compile(Profile);
                this.appElement.innerHTML = template(EDIT_PASSWORD_PAGE_DATA);
                break;
            case '/SignIn':
                template = Handlebars.compile(Authorization);
                this.appElement.innerHTML = template(SIGN_IN_PAGE_DATA);
                break;
            case '/SignUp':
                template = Handlebars.compile(Authorization);
                this.appElement.innerHTML = template(SIGN_UP_PAGE_DATA);
                break;
            default:
                template = Handlebars.compile(ErrorPage);
                this.appElement.innerHTML = template({errorCode: '404', errorDescription: 'Не туда попали'});
                break;
        }
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('.page-link').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pathName = e.currentTarget.pathname;
                this.changePage(pathName);
            })
        });
    }

    changePage(page) {
        this.state.currentPage = page;
        window.history.replaceState(null, null, page);
        this.render();
    }
}

export default App;
