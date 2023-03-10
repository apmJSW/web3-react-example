import {useState} from 'react';
import {useWeb3React} from '@web3-react/core';
import { injected } from '../utils/connectors';

function Activate() {
  const {activate, active} = useWeb3React();
  const [activating, setActivating] = useState(false);

  const handleActivate = (e) => {
    e.preventDefault();
    
    ( async function () {
      setActivating(true);
      await activate(injected);
      setActivating(false);
    })();
  };

  return <button disabled={active} onClick={handleActivate}>Connect</button>
}

function Deactivate() {
  const {deactivate, active} = useWeb3React();

  const handleDeactivate = (e) => {
    e.preventDefault();

    deactivate();
  }

  return <button disabled={!active} onClick={handleDeactivate}>Disconnect</button>
}

export function Connect() {
  const context = useWeb3React();
  // console.log(context)
  if (context.error) {
    window.alert(context.error);
  }

  return <>
    <Activate />
    <Deactivate />
  </>
}