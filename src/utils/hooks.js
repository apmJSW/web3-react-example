import {useEffect, useState, useCallback} from 'react';
import { useWeb3React } from "@web3-react/core"
import { injected } from "./connectors";

export function useWeb3Connect() {
  const {activate, active} = useWeb3React();
  // activate: 활성화 함수, active: 활성화 상태 여부 변수
  const [tried, setTried] = useState(false);

  const tryActivate = useCallback( async () => {
    try {
      await activate(injected, undefined, true);
    } catch (error) {
      window.alert('Error: ' + error?.message || '');
    }
    setTried(true);
  }, [activate]);

  useEffect(() => {
    tryActivate();
  }, [tryActivate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(flag = false) {
  const { active, error, activate} = useWeb3React();

  useEffect(() => {
    const {ethereum} = window;

    if (ethereum && ethereum.on && !active && !error && !flag) {
      const handleConnect = () => {
        console.log('connected event');
        activate(injected);
      }
      
      const handleChainChanged = (chainId) => {
        console.log('chainChanged', chainId);
        activate(injected);
      }

      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts.length === 0) {
          return console.log('accountsLength is 0');
        }
        activate(injected);
      }

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListerner('connect', handleConnect);
          ethereum.removeListener('chaninChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      }
    }
  }, [active, error, activate, flag])
}