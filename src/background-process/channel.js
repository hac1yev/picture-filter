export const createChannelToMainProcess = () => {
    const sendMessage = (message) => {
        self.postMessage(message);
    };
    const addMessageListener = (callback) => {
        const wrappedCallback = (event) => {
            callback(event.data);
        };
        self.addEventListener("message", wrappedCallback);
        return () => {
            self.removeEventListener("message", wrappedCallback);
        };
    };
    return {
        sendMessage,
        addMessageListener,
    };
};
