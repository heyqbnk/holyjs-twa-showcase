import {bridgeContext} from './context.ts';
import {PropsWithChildren, useMemo} from 'react';

// TODO: Update package
// @ts-ignore
import {Bridge} from '@twa.js/bridge';

const {Provider} = bridgeContext;

export function BridgeProvider(props: PropsWithChildren) {
  const bridge = useMemo(Bridge.init, []);

  return <Provider value={bridge}>{props.children}</Provider>;
}