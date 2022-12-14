import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { getAllListTasksThunk } from "../../store/tasks";

const ListPage = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const listId = useParams()

  useEffect(() => {
    dispatch(getAllListTasksThunk(Object.values(listId)[0]))
  }, [dispatch])

  console.log(Object.values(listId)[0])
 console.log("component tasks = ",tasks)
  return(
    <div>
      {Object.values(tasks).map(task=>(
        <div key={task.id}>
        <p>{task.name}</p>
        <p>{task.due}</p>
        </div>
      ))}
      <button onClick={()=> history.push('/profile')}> back </button>
    </div>
  )

}

export default ListPage;
