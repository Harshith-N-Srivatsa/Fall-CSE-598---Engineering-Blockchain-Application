// const { ethers } = require('ethers');
import { ethers } from 'ethers';

// const hre = require('hardhat');

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    console.log(name, message, contract);
    const amount = { value: ethers.parseEther('0.001') };
    console.log(amount.toString());
    const transaction = await contract.buychai(name, message, amount);
    await transaction.wait();
    console.log('Transaction is done');
  };
  return (
    <>
      <form onSubmit={buyChai}>
        <label>Name</label>
        <input type='text' id='name' placeholder='Enter your Name'></input>

        <label>Message</label>
        <input
          type='text'
          id='message'
          placeholder='Enter your Message'
        ></input>
        <button type='submit'> Pay </button>
      </form>
    </>
  );
};
export default Buy;
