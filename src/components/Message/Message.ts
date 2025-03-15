import Block from '../../services/Block';

import { MessageTemplate } from './index';
import './Message.style.pcss';
import { connect } from '../../services/HOC';
import store from '../../services/Store';
import { IUserData } from '../../api/AuthApi';

export interface MessageProps {
    message: string;
    time: Date;
    user_id: number;
}

class Message extends Block {
    constructor({ message, time, user_id }: MessageProps) {
        const user = store.getState().user as IUserData;
        const className = user_id === user.id ? 'outgoing' : 'incoming';

        super({
            message,
            time,
            className,
        });
    }

    render() {
        return MessageTemplate;
    }
}

export default connect(state => ({
    user: state.user,
}))(Message);
