import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newText, setNewText] = useState('Add');

  useEffect(() => {
      fetchData()
      const refresh=setInterval(()=>{
        fetchData()
      },1000)
      return ()=>{
        clearInterval(refresh)
      }
  }, []);

  const fetchData=async ()=>{    
    const response=await axios.get("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json")
    if(response.data) { 
      const data=Object.entries(response.data).map(([id,task])=>({id,...task}) )
    console.log(data)
    setTasks(data.reverse())

    }
    else{
      setTasks([])
    } 
  }

const addTask=async ()=>{
  if(newTask!==''){
    setNewText("Adding...")
    const dataFull={
      text:newTask,
    }
    await axios.post("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json",dataFull);
       
      fetchData()
      setNewText("Add")
      
  }
  setNewTask('')
}

const handleInputChange=(e)=>{
  setNewTask(e.target.value)
}

const handleInputKeyPress=(e)=>{
  if (e.key === 'Enter') {
    addTask();
  }

}

const deleteButton=async (id)=>{
  await axios.delete(`https://my-first-project-7e52e-default-rtdb.firebaseio.com/register/${id}.json`)
  fetchData()
}
  return (
    <div className="todos-bg-container">
      <h1 className='todos-heading' >Todo Application</h1>
      <h1 class="create-task-heading">
          Create <span class="create-task-heading-subpart">Task</span>
      </h1>
      <div>
        <input className='todo-user-input'
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          autocurser
        />
        <button className='button' onClick={addTask} >{newText} </button>
        <h1 class="todo-items-heading">
            My <span class="todo-items-heading-subpart">Tasks</span>
        </h1>
        {tasks.map((each)=><p className='label-container para'>{each.text}<button className='delete_button' onClick={()=> deleteButton(each.id) }>Delete </button></p>)}
        
      </div>
    </div>
  );
}

export default Todo;
