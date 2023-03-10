import React from 'react';
import {useWeb3React} from '@web3-react/core';
import {ethers} from 'ethers';

const ChainId = () => {
  const {chainId} = useWeb3React();

  return (
    <div>Chain Id: {chainId}</div>
  )
}

const BlockNumber = () => {
  const {chainId, library} = useWeb3React();
  const [blockNumber, setBlockNumber] = React.useState();

  let stale = false;

  React.useEffect(() => {
    if (!library) {
      return;
    }

    (async function () {
      try {
        const blockNumber = await library.getBlockNumber();
        if (!stale) {
          setBlockNumber(blockNumber);
        }
      } catch (error) {
        console.error('error', error);
        if (!stale) {
          setBlockNumber(undefined);
        }
      }
    })();

    library.on('block', setBlockNumber)

    return () => {
      stale = true;
      library.removeListener('block', setBlockNumber);
      setBlockNumber(undefined);
    }
  }, [library, chainId]);

  return (
    <div>
      BlockNumber: {blockNumber}
    </div>
  )
}

const Account = () => {
  const {account} = useWeb3React();

  return (
    <div>
      Account: {typeof account === 'undefined' ? '' : `${account.substring(0,6)}...${account.substring(account.length-4)}`}
    </div>
  );
}

const Balance = () => {
  const {library, account, chainId} = useWeb3React();
  const [balance, setBalance] = React.useState();

  let stale = false;

  React.useEffect(() => {
    if (!library || typeof account === 'undefined' || account === null) {
      return;
    }

    async function getBalance(library, account) {
      const balance = await library.getBalance(account);
      if (!stale) {
        setBalance(balance);
      }
    };
  
    const getBalanceHandler = () => {
      getBalance(library, account);
    }
  
    library.on('block', getBalanceHandler);

    return () => {
      stale = true;
      library.removeListener('block', getBalanceHandler);
      setBalance(undefined);
    }
  }, [account, library, chainId]);

  return (
    <div>
      Balance: {balance ? `${ethers.utils.formatEther(balance)} ETH` : ''}
    </div>
  )
}

const NextNonce = () => {
  const {account, library, chainId} = useWeb3React();
  const [nextNonce, setNextNonce] = React.useState();

  React.useEffect(() => {
    if (!library || typeof account === 'undefined' || account === null) {
      return;
    }

    let stale = false;

    async function getNextNonce(library, account) {
      const nextNonce = await library.getTransactionCount(account);

      if (!stale) {
        setNextNonce(nextNonce);
      }
    }

      getNextNonce(library, account);

      const getNextNonceHandler = () => {
        getNextNonce(library, account);
      };

    library.on('block', getNextNonceHandler);

    return () => {
      stale = true;
      setNextNonce(undefined);
    }
  }, [account, library, chainId]);

  return (
    <div>
      Next Nonce: {nextNonce}
    </div>
  )
}

export function WalletStatus() {


  return (
    <div>
      <ChainId />
      <BlockNumber />
      <Account />
      <Balance />
      <NextNonce />
    </div>
  )
}