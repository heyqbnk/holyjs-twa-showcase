import {MainPage} from './components/MainPage';
import {BridgeProvider} from './providers/BridgeProvider';

import './index.css';

function App() {
  return (
    <BridgeProvider>
      <MainPage/>
    </BridgeProvider>
  );
}

export default App;
