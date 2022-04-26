import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Box = styled.div`
  color: red;
`;

type Props = {};

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

const Two = (props: Props) => {

    const [ duration, setDuration ] = useState('')
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 10);
  const decrease = () => setCount(count - 1);
  const [prevCount, setPrevCount] = useState(count);
  const [color, setColor] = useState("yellow");
  
useEffect(() => {
    if ( duration > Date() + intervals) {

        setDuration('years')
    }
})

const changeDate = (() => {


})
  useEffect(() => {
    if (count > prevCount) {
      setPrevCount(count - 1);
    }
  }, [count]);

  useEffect(() => {
    setTime;
  });

  const refresh = () => {
    setTime(new Date().toLocaleTimeString());
  };

  const ChangeColor = () => {
    setColor("Brown");
  };

  const BackColor = () => {
    setColor("green");
  };

  const handleColorChange = () => {
    const nextColor = color === "green" ? "red" : "green";
    setColor(nextColor);
  };

 

  return (
    <>
      <div className="container p-20">
        <h1>{time}</h1>
      </div>
      <button onClick={refresh}>Refresh</button>

      <div>{color}</div>

      <button onClick={ChangeColor}>Change</button>

      <button onClick={BackColor}>Change Again</button>

      {console.log(prevCount)}
      <button onClick={increase}>increase</button>
      <button onClick={handleColorChange}>toggle color</button>
      <button disabled={count <= 0} onClick={decrease}>
        decrease
      </button>
      <br />
      <p style={{ color, fontSize: "20px", fontWeight: "bold" }}>{count}</p>
      <div>{duration}</div>


    </>
  );
};

export default Two;
