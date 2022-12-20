import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom'
import { DeleteListThunk } from "../../store/lists";
import { getAllListTasksThunk } from "../../store/tasks";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";
import CreateATaskModal from "../ListTasks";
import EditTaskModal from "../UpdateTasks";

const ListPage = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  const { listId } = useParams()


  const deleteList = (listId) => {
    dispatch(DeleteListThunk(listId))
    history.push('/home')
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
    // console.log(date)
    return [date[3], mnths[date[2]], date[1]].join("-");
  }


  useEffect(() => {
    dispatch(getAllListTasksThunk(+listId))

  }, [dispatch])

  const incomplete = Object.values(tasks).filter(task => {
    return task.completed_by == null
  })
  const completed = Object.values(tasks).filter(task => {
    return task.completed_by !== null
  })

  const complete = async (task) => {
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
    // console.log(`You tried to complete ${task.name} with user ${user.id}`)
    // console.log("task ID =", task.id)
  }
  const deleteTask = (task_id) => {
    dispatch(deleteTaskThunk(task_id))
  }
  // console.log(Object.values(listId)[0])
  // console.log("component tasks = ",tasks)


  return (
    <div className="whole-incomplete-task" id="whole-div-row-list">
      <div className="need-for-llists" id="border-bott-list-task">
      <h1 id="incomp-title">Tasks In Progress</h1>
      <div id="overflow-here">
        {incomplete.map(task => (
          <div key={task.id} className="completedTaskDiv">
            <h4>{task.name}</h4>
            <p>Notes: {task.notes}</p>
            <p>Due: {task.due.slice(0, 17)}</p>
            <div className="outer-box-actions-incom">
              <div className="complete-div-incom">
                <span>Complete:   </span>
                <button id="complete-button" onClick={() => complete(task)}>X</button>
              </div>
              <div className="edit-del-div-incom">
                <EditTaskModal taskId={task.id} />
                <button id="delete-butt-emoji" onClick={() => deleteTask(task.id)}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreateATaskModal />
      </div>
      <div className="need-for-llists">
      <h1 id="incomp-title">Tasks Completed</h1>
      <div id="overflow-here">
        {completed.map(task => (
          <div key={task.id} className="completedTaskDiv">
            <p>{task.name}</p>
          </div>
        ))}
      </div>
      <div className="make-list-del-div">
        <button class="activity-butt btn-7" onClick={() => deleteList(listId)}>🗑 List </button>
      </div>
      </div>
    </div>
  )
}
export default ListPage;
