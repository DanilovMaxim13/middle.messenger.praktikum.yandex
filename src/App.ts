import ErrorPage from './pages/ErrorPage';
import Authorization from './pages/Authorization';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

import {
  EDIT_PASSWORD_PAGE_DATA,
  EDIT_PROFILE_PAGE_DATA,
  PROFILE_PAGE_DATA,
  SIGN_IN_PAGE_DATA,
  SIGN_UP_PAGE_DATA,
} from './consts';
import ChatPage from './pages/ChatPage/ChatPage';

interface AppState {
  currentPage: string;
}

export default class App {
  private state: AppState;

  private readonly appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: window.location.pathname,
    };
    this.appElement = document.getElementById('app');
  }

  render(): string {
    const navBar =  new NavBar({ onClick: this.changePage.bind(this) });

    switch (this.state.currentPage) {
      case '/':
      case '/SignIn':
        const signInPage: Authorization = new Authorization({
          ...SIGN_IN_PAGE_DATA,
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(signInPage.getContent());
        }
        break;
      case '/SignUp':
        const signUpPage: Authorization = new Authorization({
          ...SIGN_UP_PAGE_DATA,
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(signUpPage.getContent());
        }
        break;
      case '/Profile':
        const profile: Profile = new Profile({
          ...PROFILE_PAGE_DATA,
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(profile.getContent());
        }
        break;
      case '/EditProfile':
        const editProfile: Profile = new Profile({
          ...EDIT_PROFILE_PAGE_DATA,
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(editProfile.getContent());
        }
        break;
      case '/EditPassword':
        const editPassword: Profile = new Profile({
          ...EDIT_PASSWORD_PAGE_DATA,
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(editPassword.getContent());
        }
        break;
      case '/ChatPage':
        const chatPage: ChatPage = new ChatPage({
          NavBar: navBar,
          ChatCards: [
            { name: 'Андрей', lastMessage: 'Привет!', srcAvatar: './AddAvatar.png' },
            { name: 'Андрей', lastMessage: 'Привет!', srcAvatar: './AddAvatar.png' },
            { name: 'Андрей', lastMessage: 'Привет!', srcAvatar: './AddAvatar.png' },
            { name: 'Андрей', lastMessage: 'Привет!', srcAvatar: './AddAvatar.png', className: 'active' },
            { name: 'Андрей', lastMessage: 'Привет!', srcAvatar: './AddAvatar.png' },
          ],
        });

        if (this.appElement) {
          this.appElement.replaceChildren(chatPage.getContent());
        }
        break;
      case '/404':
        const errorPage404: ErrorPage = new ErrorPage({
          errorCode: '404',
          errorDescription: 'Данная страница будет готова во 2-м спринте',
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(errorPage404.getContent());
        }
        break;
      case '/500':
        const errorPage500: ErrorPage = new ErrorPage({
          errorCode: '500',
          errorDescription: 'Данная страница будет готова во 2-м спринте',
          NavBar: navBar,
        });

        if (this.appElement) {
          this.appElement.replaceChildren(errorPage500.getContent());
        }
        break;
    }
    return '';
  }

  changePage(page: string): void {
    this.state.currentPage = page;
    window.history.replaceState(null, '', page);
    this.render();
  }
}
