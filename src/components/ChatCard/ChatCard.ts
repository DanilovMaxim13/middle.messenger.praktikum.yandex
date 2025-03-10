import Block from '../../services/Block';

import { ChatCardTemplate } from './index';
import './ChatCard.style.pcss';

export interface ChatCardProps {
    avatar?: string;
    name?: string;
    lastMessage?: string;
    className?: string;
    onClick?: any;
}

export default class ChatCard extends Block {
    constructor({
        avatar,
        name,
        lastMessage,
        className,
        onClick,
    }: ChatCardProps) {
        super({
            avatar,
            name,
            lastMessage,
            className,
            events: {
                click: (e: MouseEvent) => onClick && onClick(e),
            },
        });
    }

    render() {
        return ChatCardTemplate;
    }
}
