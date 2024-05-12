import * as signalR from "@microsoft/signalr";

const URL = "http://localhost:5000/chatHub";

class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (message: any) => void) => void;
    static instance: Connector;
    constructor(token: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
        this.connection.start()
            .then(() => console.log('Connected to SignalR hub'))
            .catch(err => console.log(err));
        this.events = (onMessageReceived) => {
            this.connection.on("ReceiveMessage", (message) => {
                onMessageReceived(message);
            });
        };
    }
    public newMessage = (GroupId: string, TopicId: string, UserId: string, Text: string) => {
        const message = {GroupId: GroupId, TopicId: TopicId, UserId: UserId, Text: Text} 
        this.connection.invoke("SendMessageToTopic", message)
    }
    public static getInstance(token: string): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector(token);
        return Connector.instance;
    }
}

export default Connector.getInstance;