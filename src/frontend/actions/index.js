import {TEXT_MESSAGE, CHANGE_NICKNAME} from './actionTypes';

export const textMessage = (text) => {
    return {
        type: TEXT_MESSAGE,
        payload: {from: 'me', text, date: Date.now()}
    };
};

export const changeNickname = (nickname) => {
    return {
        type: CHANGE_NICKNAME,
        payload: {
            from: 'me',
            nickname
        }
    };
};