
import {bridgeAtom} from '../../atoms/bridge.ts'

import React from 'react';
import {useAtom} from 'jotai';

export const BridgeComponent = ({ data }: Record<string, any>) => {
  console.log(data)
  const [bridge, setBridge] = useAtom(bridgeAtom);

  console.log(bridge);

  React.useEffect(() => {
    // Get the name from data
    const name = data?.data?.test;

    // Get the callback function from actionsFn
    const changeTestCallback = data?.actionsFn?.changeTest;

    console.log(changeTestCallback == null ? "no changeTest callback" : "changeTest callback found");

    // Only set if we have both pieces
    if (name && changeTestCallback) {
      setBridge({
        name: name,
        onClick: async () => {
          try {
            await changeTestCallback();
            console.log("changeTest action executed successfully");
          } catch (error) {
            console.error("Error executing changeTest action:", error);
          }
        }
      });
      console.log("Bridge set with wrapped callback");
    } else if (name) {
      // If we only have name, set with a default onClick
      setBridge({
        name: name,
        onClick: () => console.warn('No onClick callback provided')
      });
    }
  }, [data, setBridge]);

  return null;
}
