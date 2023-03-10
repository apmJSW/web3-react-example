import {Web3Provider} from '@ethersproject/providers';

export function getProvider(provider) {
  // console.log(provider)
  const web3Provider = new Web3Provider(provider);
  console.log(web3Provider);
  web3Provider.pollingInterval = 1000 * 1;
  return web3Provider;
}