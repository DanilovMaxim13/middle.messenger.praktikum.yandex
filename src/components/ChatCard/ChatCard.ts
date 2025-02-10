import Block from '../../services/Block';

import { ChatCardTemplate } from './index';
import './ChatCard.style.pcss';

export interface ChatCardProps {
    srcAvatar: string;
    name: string;
    lastMessage: string;
    className?: string;
}

export default class ChatCard extends Block<ChatCardProps> {
    constructor({ srcAvatar, name, lastMessage, className }: ChatCardProps) {
        super({
            srcAvatar,
            name,
            lastMessage,
            className,
        });
    }

    render() {
        return ChatCardTemplate;
    }
}
