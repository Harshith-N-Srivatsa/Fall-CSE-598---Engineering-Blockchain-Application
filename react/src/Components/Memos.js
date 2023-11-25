import { useState, useEffect } from 'react';
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
      <p>Message</p>
      {memos.map((memo) => {
        return (
          <table key={memo.timestamp}>
            <tr>
              <td>{memo.name}</td>
              <td>{memo.message}</td>
              <td>{String(memo.timestamp)}</td>
              <td>{memo.from}</td>
            </tr>
          </table>
        );
      })}
    </>
  );
};
export default Memos;
