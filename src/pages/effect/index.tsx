import { useEffect, useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [timeStump, setTimeStump] = useState<Date[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
      setTimeStump((t) => [...t, new Date()]);
    }, 2000);
    return () => {
      console.log('clear', intervalId);
      return clearInterval(intervalId);
    };
  }, [count]);

  useEffect(() => {
    console.log('called!!');
  });

  const clickHandler = () => {
    // setCount((c) => c + 1);
    setCount2((c) => c + 1);
  };
  return (
    <div>
      {/* <div>{count}</div> */}
      <div>{count + count2}</div>
      <button onClick={clickHandler}>count up</button>
      {timeStump.map((t, i) => (
        <div key={i}>{`${i}: ${t}`}</div>
      ))}
    </div>
  );
};

export default Home;
