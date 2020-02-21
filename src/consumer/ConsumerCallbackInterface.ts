import IncomingMessage from "../message/IncomingMessage";

type ConsumerCallback = (message: IncomingMessage) => void;

export default ConsumerCallback;
