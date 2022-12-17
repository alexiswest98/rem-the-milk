import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom'
import GetGroups from "../allGroups";
import './index.css'
import { getAllTasksByDayThunk } from "../../store/specTasks";
import { GetAllListsThunk } from "../../store/lists";
import { getAllTasksThunk } from "../../store/tasks";
import background from '../../Images/background.jpg';
import { getFollowsThunk } from "../../store/follows";
// import specTasksReducer from "../../store/specTasks";

export default function Dashboard() {
    const dispatch = useDispatch();

    const dayTasks = Object.values(useSelector(state => state.specTask))
    const lists = Object.values(useSelector(state => state.lists))
    const currentUser = useSelector(state => state.session)
    const groups = useSelector(state => state.groups)
    const followers = Object.values(useSelector(state => state.follows))
    useEffect(() => {
        dispatch(getAllTasksByDayThunk())
        dispatch(GetAllListsThunk())
        dispatch(getFollowsThunk())

    }, [dispatch])

    return (
    <div className="totalDash">
      <div className="leftDash">
        <div className="whiteBack">
        <div className="dayTasks">
          <h1 className="leftTitles">Tasks for the day:</h1>
          {dayTasks.map(task=>(
          <div className="dayTaskz">
          <p>{task.name}</p>
          <p>{task.due.slice(0,17)}</p>
          </div>
          ))}
        </div>
        <div className="dashLists">
          <h1 className="leftTitles">Your Lists:</h1>
          {lists.map(list=>(
          <div className="leftLists">
          <p>{list.name}</p>
          </div>
          ))}
        </div>
        </div>
      </div>
    <div className="rightDash">
      <div className="statz">
      <h1 className="activeTitle">Todays Activity</h1>
      <div className="activity">
      <div className="oneActivity">Followers: {followers.length}</div>
      <div className="oneActivity"> Lists {lists.length}</div>
      <div className="oneActivity">Tasks due today {dayTasks.length}</div>
      </div>
      </div>
      <GetGroups/>
      </div>
    </div>
    )
}
