import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllListTasksThunk } from "../../store/tasks";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";
const ListPage = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const {listId} = useParams()

  let flip = true
  const change = () => {
    flip = !flip
    console.log('flip = ', flip)
  }

  function convert(str) {
    const mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = str.split(" ");
      console.log(date)
    return [date[3], mnths[date[2]], date[1]].join("-");
  }


  useEffect(() => {
    dispatch(getAllListTasksThunk(+listId))
    let taskList
    if (flip){
      taskList= Object.values(tasks).filter(task => {
        return task.completed_by == null})
    }else{
      taskList=Object.values(tasks).filter(task => {
        return task.completed_by !== null})
    }
    console.log(taskList)
  }, [dispatch, flip])

  const incomplete = Object.values(tasks).filter(task => {
    return task.completed_by == null})
    const completed = Object.values(tasks).filter(task => {
      return task.completed_by !== null})
  const complete = async(task) => {
    const payload = {
      id: task.id,
      name: task.name,
      due: convert(task.due),
      user_id: +user.id,
      completed_by: +user.id,
      list_id: task.list_id,
      notes: task.notes
    }
    dispatch(editTaskThunk(payload))
    console.log(`You tried to complete ${task.name} with user ${user.id}`)
    console.log("task ID =", task.id)
  }
  const deleteTask = (task_id) => {
    dispatch(deleteTaskThunk(task_id))
  }
  console.log(Object.values(listId)[0])
  console.log("component tasks = ",tasks)
  return(
    <div>
        {flip ? incomplete.map(task=>(
            <div key={task.id}>
      <p>{task.name}</p>
      <div>{task.notes}
        <button onClick={() => complete(task)}>X</button> Complete
        <button onClick={()=> deleteTask(task.id)}>delete</button>
        <button onClick={()=> history.push(`/lists/${listId}/Tasks/edit/${task.id}`)}>edit</button>
          </div>
      </div>
        )) : completed.map(task => (
          <div key={task.id}>
            <p>{task.name}</p>
            <p>{task.due}</p>
          </div>
        ))}
      <button onClick={()=> history.push('/profile')}> back </button>
      <button onClick={() => history.push(`/Tasks/new/${listId}`)}> New Task</button>
      <button onClick={() => history.push(`/tasks/completed`)}> Show Complete</button>
    </div>
  )
}
export default ListPage;
