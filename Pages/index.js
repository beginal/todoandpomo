import React, { useState, useEffect } from 'react';
import Todo from '../Components/Todo';
import Pomo from '../Components/Pomo';
import styled from '@emotion/styled';

const Root = styled.div`
  background: #ff9999;
  display: flex;
  justify-content:center;
  align-items:center;
  border: 1px solid black;
  width: 300px;
  height: 400px;
  position: relative;
`

const TabChange = styled.div`
  display: flex;
  justify-content:center;
  position: absolute;
  width: 100%;
  background: none;
  top: 0px;
  margin-bottom: 1rem;
  .Tabshover {
    cursor:pointer;
    width: 120px;
    height: 40px;
    font-size: 20px;
  }
  `
const Tabs = styled.div`
  border-radius: 0px 0px  15px 15px;
  background: ${props => props.bgc || "none"};
  padding: 2px 10px;
  margin-left: 3px;
  font-size: 15px;
  font-weight: 600;
  text-align:center;
  width: 50px;
  height: 25px;
  box-shadow: 2px 0px rgba(0,0,0,0.3);
  transition: width 1s, height 1s, font-size 1s; 
  &:hover {
    cursor:pointer;
    width: 120px;
    height: 40px;
    font-size: 20px;
  }
`
const index = () => {

const [ useTab, setUseTab ] = useState('TODO')

useEffect(() => {
}, [])

const ChangeTab = (e) => {
  setUseTab(e.target.getAttribute('name'))
}

const watchTab = () => {
  switch(useTab) {
    case 'TODO' : return <Todo />
    case 'POMODORO' : return <Pomo />
    default : return <Todo />
  }
}
  return (
    <Root>
      <TabChange>
        <Tabs className={useTab === 'TODO' ? 'Tabshover' : ""} bgc="#ffbbcc" name="TODO" onClick={ChangeTab}>TODO</Tabs>
        <Tabs className={useTab === 'POMODORO' ? 'Tabshover' : ""} bgc="#fdefde" name="POMODORO" onClick={ChangeTab}>POMO</Tabs>
      </TabChange>
      { watchTab() }
    </Root>
  )
}

export default index;
