import _ from 'lodash';

export const saveMessages = (messages) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages.slice(Math.max(messages.length - 10, 0))));
};

export const loadMessages = () => {
    return JSON.parse(localStorage.getItem('chat_messages'));
};

export const saveNicknames = (nicknames) => {
    localStorage.setItem('chat_nicknames', JSON.stringify(nicknames));
};

export const loadNicknames = () => {
    return JSON.parse(localStorage.getItem('chat_nicknames'));
};