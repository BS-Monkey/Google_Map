import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props:any) => {
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [ start, setStart ] = useState('')


useEffect(() => {
    setStart
})

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    const Starter = () => {

        setInterval
    }

    return (
        <>
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
        <>{10 + minutes}</>

        <div><button onClick={Starter}>Starter</button></div>
        </>

    )
}

export default Timer;