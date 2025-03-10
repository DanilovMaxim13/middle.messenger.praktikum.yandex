import Block from '../../services/Block';

import { MessagesTemplate } from './index';
import './Messages.style.pcss';
import Message from '../Message';

export interface MessagesProps {
    messages?: any[];
}

export default class Messages extends Block {
    constructor({ messages }: MessagesProps) {
        super({
            Messages: messages?.map(item => {
                console.log(item);
                return new Message({
                    message: item.content,
                    time: item.time,
                    user_id: item.user_id,
                });
            }),
        });
    }

    render() {
        return MessagesTemplate;
    }
}
