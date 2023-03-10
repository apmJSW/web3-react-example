import React from 'react';
import {useWeb3React} from "@web3-react/core";
import {ethers} from 'ethers';
import GreetingArtifact from '../artifacts/contracts/Greeting.sol/Greeting.json'

export function ContractCall() {
  const {active, library} = useWeb3React();

  const [signer, setSigner] = React.useState();
  const [greetingContract, setGreetingContract] = React.useState();
  const [greetingContractAddr, setGreetingContractAddr] = React.useState('');
  const [greeting, setGreeting] = React.useState('');
  const [greetingInput, setGreetingInput] = React.useState('');

  React.useEffect(() => {
    if (!library) {
      return setSigner(undefined);
    }

    setSigner(library.getSigner());
  }, [library]);

  React.useEffect(() => {
    if (!greetingContract) {
      return;
    }

    (async function () {
      const _greeting = await greetingContract.greet();
      if (_greeting === greeting) {
        return;
      }
      
      setGreeting(_greeting);
    })();
  }, [greetingContract, greeting])

  const handleDeployContract = (e) => {
    e.preventDefault();

    if (greetingContract) {
      return;
    }

    (async function deployGreetingContract() {
      const Greeting = new ethers.ContractFactory(
        GreetingArtifact.abi, 
        GreetingArtifact.bytecode,
        signer
        );
      
      try {
        const greetingContract = await Greeting.deploy('Hello, Fastcampus');
        await greetingContract.deployed();

        const greeting = await greetingContract.greet();

        setGreetingContract(greetingContract);
        setGreetingContractAddr(greetingContract.address);
        setGreeting(greeting);
        window.alert(`Greeting deplyed to: ${greetingContract.address}`);
      } catch (error) {
        window.alert('Error: ', error?.message || '' );
      }
    })();
  }

  const handleGreetingChange = (e) => {
    e.preventDefault();
    setGreetingInput(e.target.value);
  }

  const handleGreetingSubmit = (e) => {
    e.preventDefault();

    if (!greetingInput) {
      return window.alert('Greeting cannot be empty');
    }

    (async function () {
      try {
        const setGreetingTx = await greetingContract.setGreeting(greetingInput);
        await setGreetingTx.wait(); // transaction 처리 기다림
        
        const newGreeting = await greetingContract.greet();
        window.alert(`Success: ${newGreeting}`);

        if (newGreeting !== greeting) {
          setGreeting(newGreeting);
        }
      } catch (error) {
        window.alert('Error: ', error?.message || '');
      }
    })();
  }

  return (
    <>
      <div style={{textAlign: 'center'}}>
        <button 
        disabled={!active || greetingContract} 
        onClick={handleDeployContract}>
          Deploy Greeting Contract
        </button>
      </div>
      <div style={{height: '20px'}} />
      <div>
        <strong>Contract Address</strong>
        <span> {greetingContractAddr || 'Contract not yet deployed'}</span>
      </div>
      <div style={{height: '10px'}} />
      <div>
        <strong>Greeting</strong>
        <span> {greeting || 'Contract not yet deployed'}</span>
      </div>
      <div style={{height: '10px'}} />
      <div>
        <label htmlFor='greetingInput'>Set new Greeting</label>
        {' '}
          <input 
            id="greetingInput" 
            type="text" 
            placeholder={greeting ? '' : 'Contract not yet deployed' }
            onChange={handleGreetingChange} 
          />
        {' '}
        <button
          disabled={!active || !greetingContract}
          onClick={handleGreetingSubmit}
        >Submit</button>
      </div>
    </>
  )
}