import {TEXT_MESSAGE} from './actionTypes';

export const textMessage = (text) => {
    return {
        type: TEXT_MESSAGE,
        payload: {from: 'me', text, date: Date.now()}
    };
};