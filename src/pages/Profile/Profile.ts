import Block from '../../services/Block';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { InputProps } from '../../components/Input';
import Label from '../../components/Label';
import Link, { LinkProps } from '../../components/Link';

import { ProfileTemplate } from './index';
import './Profile.style.pcss';
import store from '../../services/Store';
import authApi, { IUserData } from '../../api/AuthApi';
import router from '../../services/Router';
import { connect } from '../../services/HOC';
import Validator from '../../services/Validator';
import AvatarModal from '../../components/AvatarModal';

interface ProfileProps {
    Inputs: InputProps[];
    Links?: LinkProps[];
    buttonText?: string;
    buttonOnClick?: (data: any) => void;
}

class Profile extends Block {
    constructor({ Inputs, buttonText, buttonOnClick, Links }: ProfileProps) {
        super({
            Avatar: new Avatar({
                src: './AddAvatar.png',
                className: 'profile-section__avatar',
                onClick: () => {
                    this.children.AvatarModal.setProps({ className: '' });
                },
            }),
            AvatarModal: new AvatarModal({
                title: 'Загрузите файл',
                className: 'avatar-modal_hidden',
            }),
            Button: buttonText
                ? new Button({
                      text: buttonText,
                      onClick: (e: MouseEvent) => {
                          e.preventDefault();
                          const data: Record<string, string> = {};

                          this.lists.Inputs.forEach(children => {
                              const inputData = Validator.getFormData(children);
                              if (inputData) {
                                  data[inputData.name] = inputData.value;
                              }
                          });

                          const isFormValid = this.checkFormValidity();

                          if (isFormValid) {
							  if (buttonOnClick) {
								  buttonOnClick(data);
							  }
                          }
                      },
                  })
                : null,
            Inputs: Inputs.map(
                inputsProps =>
                    new Label({
                        ...inputsProps,
                        className: 'profile-section__input',
                    })
            ),
            Links: Links ? Links.map(linkProps => new Link(linkProps)) : null,
        });
    }

    checkFormValidity() {
        const Inputs = this.lists.Inputs;
        let isFormValid = true;

        Inputs.forEach(input => {
            if (input instanceof Label) {
                if (!input.isValid()) {
                    isFormValid = false;
                }
            }
        });

        return isFormValid;
    }

    componentDidMount() {
        if (!store.getState().user) {
            void authApi.getUser().then(data => {
				const { status, responseText } = data as XMLHttpRequest;
                if (status === 200) {
                    const userData = JSON.parse(responseText);
                    store.set('user', userData);

                    this.lists.Inputs.forEach(item => {
                        const id = item.children.Input.props.id;
                        item.children.Input.setProps({ value: userData[id] });
                    });
                    this.children.Avatar.setProps({
                        src: userData.avatar
                            ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`
                            : './AddAvatar.png',
                    });
                } else {
                    router.go('/');
                }
            });
        } else {
            const user = store.getState().user as IUserData;

            this.lists.Inputs.forEach(item => {
                const id = item.children.Input.props.id as keyof IUserData;
                item.children.Input.setProps({ value: user[id] });
            });
            this.children.Avatar.setProps({
                src: user.avatar
                    ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
                    : './AddAvatar.png',
            });
        }
    }

    render() {
        return ProfileTemplate;
    }
}

export default connect(state => ({
    user: state.user,
}))(Profile);
