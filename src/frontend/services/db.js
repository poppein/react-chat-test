export const saveMessages = (messages) => {
    let messagesToTake = messages.length - 10;
    messagesToTake = messagesToTake >= 0 ? messagesToTake : 10;
    localStorage.setItem('chat_messages', JSON.stringify(messages.slice(messages.length - 10)));
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