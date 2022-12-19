import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { getAllTasksByTomThunk } from "../../store/specTasks";
import React, { useEffect } from "react";
import { editTaskThunk } from "../../store/tasks";
import { deleteTaskThunk } from "../../store/tasks";
import { getAllTasksThunk } from "../../store/tasks";
import EditTaskModal from "../UpdateTasks";

export default function TomTask() {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const lists = useSelector(state => state.lists)
  const tasks = useSelector(state => state.tasks)
  // const {listId} = useParams()

  useEffect(() => {
    dispatch(getAllTasksByTomThunk())
  }, [dispatch, tasks])

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

  const complete = async (task) => {
    const payload = {
      id: task.id,
      name: task.name,
      due: convert(task.due),
      user_id: +user.id,
      completed_by: +user.id,
      notes: task.notes
    }
    dispatch(editTaskThunk(payload))
    // console.log(`You tried to complete ${task.name} with user ${user.id}`)
    // console.log("task ID =", task.id)
  }

  const deleteTask = (task_id) => {
    dispatch(deleteTaskThunk(task_id))
  }

  useEffect(() => {
    dispatch(getAllTasksThunk())
  }, [dispatch])

  const tomTasks = Object.values(useSelector(state => state.specTask))
  const incomTomTasks = tomTasks.filter(task => task.completed_by == null)


  return (
    <div className="whole-incomplete-task">
      <h1 id="incomp-title">Incompleted Tasks</h1>
      <div id="overflow-here">
        {incomTomTasks.map(task => (
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
    </div>
  )

}
