import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import {css} from '@emotion/core';

const TodoForm = styled.form`
  width: 100%;
  position:absolute;
  bottom:0;
`
const TodoHeader = styled.div`
  display: flex;
  height: 2rem;
  margin: 2px 0;
  width: 100%;
  input {
    flex:1;
    margin-left:2px;
    font-size: 1rem;
    padding: 0 4px;
    outline:none;
    border:none;
    &::placeholder {
      color: rgba(0,0,0,0.5);
    }
  }
  button {
    border: none;
    outline: none;
    margin: 0 2px;   
  }
`

const TodoList = styled.div`
  width:100%;
  background: white;
  height: 280px;
  overflow-y:scroll;
  margin: 0px;
    .modify_div {
    display: inline;
    .modify_button {
      display: inline;
      font-size: 0.5rem;
      cursor: pointer;
      margin: 0 2px;
      border-radius: 10px;    
    }
  }
  .modify_Input {
    flex:1;
    padding: 1px 3px;
  }
  .modify {
    color: blue;
    margin: 0 5px;
    float:right;
    &:hover {
      cursor: pointer;
    }
  }
  .checked {
    float: left;
    margin: 0 5px;
    &:hover {
      cursor:pointer;
    }
  }
  .remove {
    color: pink;
    margin: 0 15px;
    &:hover {
      color:red;
      cursor: pointer;
    }
  }
`

const TodoListItem = styled.div`
  
  width: 100%;
  background: white;
  padding: 3px 0;
  display: flex;
  flex-direction:row;
  box-sizing: border-box;
  &:nth-of-type(2n) {
    background:#ffedec;
  }
  ${props => props.checked &&
    css`
    color: blue;
    span {
      color: gray;
      text-decoration: line-through;

    }
    `
   }
  span {
    display: flex;
    flex:1;
  }
  /* & + & {
    border-top: 1px solid black;
  } */
`

const Todo = () => {
  const [InputTodo, setInputTodo] = useState('');
  const [TodoInputModify, setTodoInputModify] = useState()
  const [TodoLists, setTodoLists] = useState([
    {id: 1, text :123, check:false, modify:false},
    {id: 2, text :456, check:false, modify:false}
  ]);

  const nextId = useRef(3);

  useEffect(() => {
  },[])

  const onChangeInputTodo = useCallback((e) => {
    e.preventDefault();
    setInputTodo(e.target.value)
  },[])

  const ModifyInputTodo = useCallback((e) => {
    setTodoInputModify(e.target.value)
  },[])
  // const onChangeModifyTodo = useCallback(() => {
  //   setTodoList()
  // }, [])
  const onToggleModify = useCallback((id) => {
    TodoLists.map(todo => todo.id === id && setTodoInputModify(todo.text))
    setTodoLists(TodoLists.map(todo => todo.id === id ? {...todo, modify: !todo.modify} : {...todo, modify: false}))
  }, [TodoLists])

  const ChangeText = useCallback((id) => {
    setTodoLists(TodoLists.map(todo => todo.id === id ? {...todo, text:TodoInputModify, modify: false} : todo))
  },[TodoLists,TodoInputModify])

  const TodoChecked = useCallback((id) => {
    setTodoLists(TodoLists.map(todo => todo.id === id ? {...todo, check: !todo.check} : todo))
  }, [TodoLists])
  
  const AddTodo =  useCallback((e) => {
    e.preventDefault();
    const todo = {
      id: nextId.current,
      text:InputTodo,
      check: false,
      modify:false
    }
    setTodoLists([...TodoLists, todo])
    nextId.current += 1;
    setInputTodo("")
  },[TodoLists,InputTodo])

  const RemoveTodo = useCallback((id) => {
    setTodoLists(TodoLists.filter(todo => todo.id !== id))
  },[TodoLists])


  return (
    <TodoForm onSubmit={AddTodo}>
      <TodoHeader>
        <input type="text" value={InputTodo} onChange={onChangeInputTodo} placeholder="할 일을 입력해주세요"/>
        <button type="submit">입력</button>
      </TodoHeader>
      <TodoList>
        {TodoLists.map((Todo,index) => (
          <TodoListItem key={Todo.id} checked={Todo.check}>
            <div className='checked' onClick={() => TodoChecked(Todo.id)}>ㅇ</div>
            {Todo.modify ?
            <div className="modify_div" >
              <input className="modify_Input" value={TodoInputModify} onChange={ModifyInputTodo} />
              <div className="modify_button" onClick={() => ChangeText(Todo.id)} >수정</div> 
              <div className="modify_button" onClick={() => onToggleModify(Todo.id)}>취소</div> 
            </div>
              :
            <span onClick={() => onToggleModify(Todo.id)}>{Todo.text}</span>
            }
            <div className="remove" onClick={() => RemoveTodo(Todo.id)}>X</div>
          </TodoListItem>
        ))}
      </TodoList>
    </TodoForm>
  )
}

export default Todo;
