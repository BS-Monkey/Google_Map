import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';


const Box = styled.div`
color: red;
`

const Wave = styled.div `

font-size: 90px;
color: red
`
const Wave1 = styled.div `

font-size: 20px;
padding-top: 90px;
font-weight: 600;
color: black;
`

// import the icons you need
import {
  faSearch,
  faAmbulance,
  faAnchor,
  faCoffee,
  faUser
} from "@fortawesome/free-solid-svg-icons";



type Props = {}

const Tester = (props: Props) => {
  const [ time, setTime] = React.useState(new Date().toLocaleTimeString())

 useEffect(() => {
  
      setTime
    });
  return (
    <>

    <ul></ul>
    <div> <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>

  <Box><p>COLOR</p></Box>
  
  <h1>{time}</h1></div>
  <div>


<FontAwesomeIcon icon={['fab', 'twitter']} />
      <FontAwesomeIcon icon="coffee" />
  
</div>
<div>
      <FontAwesomeIcon
        icon={faSearch}
        style={{ fontSize: 100, color: "blue" }}
        />

      <FontAwesomeIcon
        icon={faAmbulance}
        style={{ fontSize: 100, color: "orange" }}
   
      />

      <FontAwesomeIcon
        icon={faAnchor}
        style={{ fontSize: 100, color: "green" }}
        titleId='was'
      />
    </div>
<i className="fas fa-calendar text-9xl"></i><span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-">27</span>
   <span className='text-3xl '>A</span>

<Wave>

<span className="fa-layers fa-fw" >
      <i className="fa-solid fa-circle-user"></i>
      <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3" ><Wave1>A</Wave1></span>
    </span>

</Wave>






</>
  )
}

export default Tester