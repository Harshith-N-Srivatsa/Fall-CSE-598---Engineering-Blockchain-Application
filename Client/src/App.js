import abi from './contract/chai.json';
import './App.css';
import { useState, useEffect } from 'react';
import Buy from './Components/Buy';
import Memos from './Components/Memos';
const ethers = require('ethers');

function App() {
  const [state, setState] = useState({
    ethProvider: null,
    ethSigner: null,
    contract: null,
  });
  useEffect(() => {
    const handleWalletConnect = async () => {
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

          const ethProvider = new ethers.BrowserProvider(window.ethereum);

          const ethSigner = await ethProvider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            ethSigner
          );
          setState({ ethProvider, ethSigner, contract });
        } else {
          console.error('Ethereum provider not available');
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleWalletConnect();
  }, []);
  console.log(state);
  return (
    <div className='App' style={{ background: '#f0f0f0', color: 'blue' }}>
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  );
}

export default App;
