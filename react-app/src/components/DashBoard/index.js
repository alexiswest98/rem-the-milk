import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom'
import GetGroups from "../allGroups";
import { getAllTasksByMonthThunk } from "../../store/tasks";

export default function Dashboard() {
    const dispatch = useDispatch();


    const monthTasks = Object.values(useSelector(state => state.tasks))
    const lists = Object.values(useSelector(state => state.tasks))

    useEffect(() => {
        dispatch(getAllTasksByMonthThunk())
    }, [dispatch])

    return (
        <div>
      {monthTasks.map(task=>(
        <div>
        <p>{task.name}</p>
        <p>{task.due}</p>
        </div>
      ))}
      <h3>Todays Activity</h3>
      <div> Lists {lists.length}</div>
      <div>Tasks due today {monthTasks.length}</div>

        <GetGroups/>
        </div>
    )
}