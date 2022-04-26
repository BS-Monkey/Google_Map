import React from 'react'
import type { NextPage } from 'next'
import userSWR from 'swr'
import styled from 'styled-components'

const Changer = styled.div`
color: green;

`
const NotChanger = styled.div`
color: red;
`


type Props = {

    percentage: number
}

const Counter: NextPage = (props: Props) => {
    const counter = 'http://localhost:4000/people-count';
    const fetcher = async (url: string) => fetch(url).then((res) => res.json());
    const {data, error} = userSWR(counter, fetcher);
    if ( error ) <p>Loading failed..</p>;
    if (!data)<h1>Loading..</h1>;

    
    const percentage:any = ((34 / data)).toFixed(2)


  return (
      <>
    <div className='pt-40 pl-40'>Counter</div>
    <div className='pl-40'>{data}</div>
    <div className='pl-40'>{data >  0 ? <p><Changer>{data}</Changer>yes</p> : <p>not</p>} </div>
    <div className='pl-40'>{data >  0 ? <p><NotChanger>{data}</NotChanger>no</p> : <p>not</p>} </div>
    <div className='pl-40'>{percentage}</div>
    <div className='pl-40'>{percentage < 0.5 ? <p>yes</p> : <p><Changer>{percentage}</Changer></p>} </div>
    <div className='pl-40'>{percentage  > 4 ? <p>no</p> : <p><NotChanger>{percentage}</NotChanger></p>} </div>

    </>
  )
}

export default Counter