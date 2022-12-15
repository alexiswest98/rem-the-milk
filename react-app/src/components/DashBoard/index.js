import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom'
import GetGroups from "../allGroups";
import './index.css'
import { getAllTasksByDayThunk } from "../../store/specTasks";
import { GetAllListsThunk } from "../../store/lists";
// import specTasksReducer from "../../store/specTasks";

export default function Dashboard() {
    const dispatch = useDispatch();


    const dayTasks = Object.values(useSelector(state => state.specTask))
    const lists = Object.values(useSelector(state => state.lists))
    const currentUser = useSelector(state => state.session)
    const groups = useSelector(state => state.groups)
    useEffect(() => {
        dispatch(getAllTasksByDayThunk())
        dispatch(GetAllListsThunk())
    }, [dispatch])

    return (
    <div className="totalDash">
      <div className="leftDash">
        <div className="dayTasks">
      {dayTasks.map(task=>(
        <div>
        <p>{task.name}</p>
        <p>{task.due}</p>
        </div>
      ))}
        </div>
        <div className="dashLists">
          <h3>Lists:</h3>
        {lists.map(list=>(
        <div>
        <p>{list.name}</p>
        </div>
      ))}
        </div>

      </div>
    <div className="rightDash">
      <div className="statz">
      <h3>Todays Activity</h3>
      <div> Lists {lists.length}</div>
      <div>Tasks due today {dayTasks.length}</div>
      </div>
      <GetGroups/>
      </div>
    </div>
    )
}
