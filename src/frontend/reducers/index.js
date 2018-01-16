import {TEXT_MESSAGE, CHANGE_NICKNAME} from '../actions/actionTypes';

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
        default:
          return state;
      }
};
