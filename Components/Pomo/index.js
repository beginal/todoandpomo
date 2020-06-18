import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

const Clock = styled.div`
  background:white;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  div,span {
    font-size: 60px;
    display: table-cell;
    vertical-align: middle;
    font-weight:500;
  }
  span {
    padding-bottom: 10px;
  }
`



const Pomo = () => {
  const [timer, setTimer] = useState({hour: '00', min:'00'});

  useEffect(() => {
    console.log(timer)
  },[timer])

  const countup = () => {
    const addmin = Number(timer.min) + 1;
    addmin <= 9 ? setTimer({...timer, min: '0' + addmin})
    : setTimer({...timer, min: addmin})
  }
  const countup2 = () => {
    const addhour = Number(timer.hour) + 1;
    addhour <= 9 ? setTimer({...timer, hour: '0' + addhour})
    : setTimer({...timer, hour: addhour})
  }

  return (
    <>
    <Clock>
      <div>{timer.hour}</div>
      <span>:</span>
      <div>{timer.min}</div>
    </Clock>
    <div onClick={countup}>up</div>
    <div>hour</div>
    </>
  )
}

export default Pomo;
