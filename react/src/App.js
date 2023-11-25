import abi from './contract/chai.json';
import './App.css';
import { useState, useEffect } from 'react';
import Buy from './Components/Buy';
import Memos from './Components/Memos';
const ethers = require('ethers');

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0xddbe782843ffbba42b35db6bfdd1c4d17426f55f';
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          console.log(account);
          ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          ethereum.on('accountsChanged', () => {
            window.location.reload();
          });

          //const provider = await new ethers.providers.Web3Provider(ethereum);
          const provider = new ethers.BrowserProvider(window.ethereum);

          //  console.log(provider);

          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setState({ provider, signer, contract });
        } else {
          console.error('Ethereum provider not available');
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className='App'>
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  );
}

export default App;
