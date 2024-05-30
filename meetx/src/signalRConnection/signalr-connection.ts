import * as signalR from "@microsoft/signalr";

const URL = "http://localhost:5000/chatHub";

class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (message: any) => void) => void;
    public update: (onMessageReceived: (message: any) => void) => void;
    static instance: Connector | null = null;
    public isConnected: boolean;
    private setConnected?: (isConnected: boolean) => void;

    constructor(setConnected?: (isConnected: boolean) => void) {
        this.isConnected = false;
        this.setConnected = setConnected;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, { accessTokenFactory: () => localStorage.getItem("token") || "" })
            .withAutomaticReconnect()
            .build();

        this.startConnection();

        this.connection.onclose(() => {
            if (this.setConnected) this.setConnected(false);
            console.log('Disconnected from SignalR hub');
        });

        this.connection.onreconnecting(() => {
            if (this.setConnected) this.setConnected(false);
            console.log('Reconnecting to SignalR hub');
        });

        this.connection.onreconnected(() => {
            if (this.setConnected) this.setConnected(true);
            console.log('Reconnected to SignalR hub');
        });

        this.events = (onMessageReceived) => {
            this.connection.on("ReceiveMessage", (message) => {
                onMessageReceived(message);
            });
        };

        this.update = (onMessageReceived) => {
            this.connection.on("UpdateConv", (message) => {
                onMessageReceived(message);
            });
        };
    }

    private startConnection() {
        this.connection.start()
            .then(() => {
                if (this.setConnected) this.setConnected(true);
                this.isConnected = true;
                console.log('Connected to SignalR hub');
            })
            .catch(err => {
                if (this.setConnected) this.setConnected(false);
                this.isConnected = false;
                console.log('Failed to connect to SignalR hub:', err);
            });
    }

    public newMessage = (GroupId: string, TopicId: string, Text: string, files: any) => {
        const message = { GroupId, TopicId, Text, Files: files };
        this.connection.invoke("SendMessageToTopic", message);
    }

    public newPrivateMessage = (UserId: string, Text: string, files: any) => {
        const message = { UserId, Text, Files: files };
        this.connection.invoke("SendMessageToUser", message);
    }

    public static getInstance(setConnected?: (isConnected: boolean) => void): Connector {
        if (!Connector.instance) {
            Connector.instance = new Connector(setConnected);
        } else if (setConnected) {
            Connector.instance.setConnected = setConnected;
            // Update the state immediately if already connected
            setConnected(Connector.instance.isConnected);
        }
        return Connector.instance;
    }
}

export default Connector.getInstance;