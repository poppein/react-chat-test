import invariant from 'invariant';
import _ from 'lodash';

export class ChatClient {
    constructor({dispatch, url}) {
        invariant(_.isFunction(dispatch), 'dispatch must be a function');
        this.dispatch = dispatch;
    }

    connect(url) {
        invariant(_.isString(url), 'url must be a string');
        this.client = new WebSocket(url);

        this.client.onerror = (error) => {
            console.error(error);
        };

        this.client.onopen = () => {
            console.log('Connected');
        };

        this.client.onclose = () => {
            console.log('Closed');
        };

        this.client.onmessage = (e) => {
            if (typeof e.data === 'string') {
                let messageReceived = JSON.parse(e.data);
                messageReceived.payload.from = 'them';
                this.dispatch(messageReceived);
            }
        };
    }

    sendMessage(message) {
        if (this.client.readyState === this.client.OPEN) {
            this.client.send(JSON.stringify(message));
        }
    }
}