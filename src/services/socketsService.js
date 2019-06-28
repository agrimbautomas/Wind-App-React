import Pusher from 'pusher-js';

class SocketsService {

    static PUSHER_KEY = '6f7516e788fca20efda3';
    static PUSHER_CLUSTER = 'mt1';
    static CHANNEL_NAME = 'stats-channel';
    static TOPIC_NAME = 'stats-changed';

    static listenForNewWindLogs = (listener) => {

        Pusher.logToConsole = true;
        Pusher.log = (msg) => {
            //console.log(msg);
        };

        const socket = new Pusher(this.PUSHER_KEY, {
            cluster: this.PUSHER_CLUSTER
        });

        socket.connection.bind('error', function (err) {
            if (err.error.data.code === 4004) {
                console.log('Over limit!');
            }
        });

        const channel = socket.subscribe(this.CHANNEL_NAME);
        channel.bind(this.TOPIC_NAME, function (data) {
            listener.socketsCallback(data);
        });
    }

}

export default SocketsService;