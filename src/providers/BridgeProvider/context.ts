import {createContext, useContext} from 'react';

import {Bridge} from '@twa.js/bridge';

export const bridgeContext = createContext(Bridge.init());

export const useBridge = () => useContext(bridgeContext);