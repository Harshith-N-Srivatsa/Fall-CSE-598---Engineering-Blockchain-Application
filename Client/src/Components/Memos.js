import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getmemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <h2>Transaction History</h2>
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Timestamp</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo) => (
            <tr key={memo.timestamp}>
              <td>{memo.name}</td>
              <td>{memo.message}</td>
              <td>{String(memo.timestamp)}</td>
              <td>{memo.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Memos;
