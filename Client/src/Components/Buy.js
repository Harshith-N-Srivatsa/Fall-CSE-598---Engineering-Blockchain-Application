// const { ethers } = require('ethers');
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

// const hre = require('hardhat');

const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
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
    <div
      className='container'
      style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }}
    >
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center mt-4'>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Starbucks_Coffee_Logo.svg/225px-Starbucks_Coffee_Logo.svg.png'
            alt='Starbucks Logo'
            className='img-fluid'
          />
          <h1 className='text-center mt-4'>
            Starbucks Blockchain Payment System
          </h1>

          <form onSubmit={buyCoffee} className='mt-4'>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                className='form-control'
                placeholder='Enter your Name'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <input
                type='text'
                id='message'
                className='form-control'
                placeholder='Enter your Message'
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Buy;
