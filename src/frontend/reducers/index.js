import {TEXT_MESSAGE, CHANGE_NICKNAME, DELETE_LAST_MESSAGE} from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    messages: [],
    nicknames: {me: 'Anonymous', them: 'Anonymous'}
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case TEXT_MESSAGE: {
          let newState = {
            ...state,
            messages: [...state.messages, action.payload]
          };
          return newState;
        }
        case CHANGE_NICKNAME: {
            let newState = {
              ...state,
              nicknames: {
                ...state.nicknames,
                [action.payload.from]: action.payload.nickname
              }
            };
            return newState;
        }
        case DELETE_LAST_MESSAGE: {
            let recipientMessages = state.messages.filter(message => message.from === action.payload.from);
            if (recipientMessages.length > 0) {
              let messageToRemove = _.orderBy(recipientMessages, ['date'], ['desc'])[0];
              let indexToRemove = state.messages.indexOf(messageToRemove);
              let newState = {
                ...state,
                messages: [...state.messages.slice(0, indexToRemove), ...state.messages.slice(indexToRemove + 1)]
              };
              return newState;
            }
            return state;
        }
        default:
          return state;
      }
};
