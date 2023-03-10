import {useWeb3React} from '@web3-react/core';

export function SignMessage() {
  const {account, active, library} = useWeb3React();

  const handleSignMessage = (e) => {
    e.preventDefault();

    if (!library || !account) {
      return;
    }

    (async function (library, account) {
      try {
      const signature = await library.getSigner(account).signMessage('Hello Fastcampus');
      window.alert('Success: ' + signature);
    } catch (error) {
      window.alert('Error: ' + error?.message || '');
    }
    })(library, account);
  }

  return (
    <button
      disabled={!active}
      onClick={handleSignMessage}
    >
      Sign Message
    </button>
  )
}