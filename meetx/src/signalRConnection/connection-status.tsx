import { useState, useEffect } from 'react';
import Connector from '../signalRConnection/signalr-connection';

const ConnectionStatus = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        Connector(isConnected => {
            setIsConnected(isConnected);
        });
    }, []);

    return (
        <div className={isConnected ? "bg-green-600 py-1 px-2 rounded-full whitespace-nowrap" : "bg-red-600 py-1 px-2 rounded-full whitespace-nowrap"}>
            {isConnected ? "Connected" : "Not Connected"}
        </div>
    );
};

export default ConnectionStatus;