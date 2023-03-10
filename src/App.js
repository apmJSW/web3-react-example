import { Connect } from './components/Connect';
import {WalletStatus} from './components/WalletStatus';
import {SignMessage} from './components/SignMessage';
import { ContractCall } from './components/ContractCall';

function App() {
  return (
    <>
      <Connect />
      <div style={{height: '20px'}}/>
      <WalletStatus />
      <div style={{height: '20px'}}/>
      <SignMessage />
      <div style={{height: '20px'}}/>
      <ContractCall />
    </>
  );
}

export default App;
