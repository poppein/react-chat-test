import {TEXT_MESSAGE, CHANGE_NICKNAME, DELETE_LAST_MESSAGE} from './actionTypes';

export const textMessage = (text, styles) => {
    return {
        type: TEXT_MESSAGE,
        payload: {from: 'me', text, date: Date.now(), styles}
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

export const deleteLast = () => {
    return {
        type: DELETE_LAST_MESSAGE,
        payload: {from: 'me'}
    };
};