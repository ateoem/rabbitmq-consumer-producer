import Stoppable from "./common/Stoppable";

const listenerCreator = (stoppables: Stoppable[]) => (): void => {
  console.log("Caught interrupt signal");
  if (stoppables.length > 0) {
    Promise.all(
      stoppables.map((consumerBridge: Stoppable) => consumerBridge.stop())
    ).then(() => {
      console.log(`Gracefully shutting down`);
      process.exit(0);
    });
  } else {
    console.log(`Gracefully shutting down`);
    process.exit(0);
  }
};

export default listenerCreator;
