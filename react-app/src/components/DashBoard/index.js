import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import GetGroups from "../allGroups";
import './index.css'
import { getAllTasksByDayThunk } from "../../store/specTasks";
import { GetAllListsThunk } from "../../store/lists";
import { getAllTasksThunk } from "../../store/tasks";
// import background from '../../Images/background.png';
import { getFollowingThunk } from "../../store/follows";
import { getFollowsThunk } from "../../store/follows";
// import specTasksReducer from "../../store/specTasks";


export default function Dashboard() {
  const dispatch = useDispatch();

  const dayTasks = Object.values(useSelector(state => state.specTask))
  const lists = Object.values(useSelector(state => state.lists))
  const currentUser = useSelector(state => state.session)
  const groups = useSelector(state => state.groups)
  const followers = Object.values(useSelector(state => state.follows))
  const following =  Object.values(useSelector(state => state.follows))
  const followingLength = following.length -1 

  useEffect(() => {
    dispatch(getAllTasksByDayThunk())
    dispatch(GetAllListsThunk())
    dispatch(getFollowsThunk())
    dispatch(getFollowingThunk())
  }, [dispatch])

  let currentDate = () => {

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = new Date();

    let day = weekday[today.getDay()];
    let d2 = today.toUTCString().slice(0, 17)

    return `${day} ${d2}`
  }

  return (
    <div className="totalDash">
      <div className="leftDash">
        <div className="whiteBack">
          <div className="fit-whole-white-back">
            <div className="today-date-box">
              <h1 className="today-date">{currentDate()}</h1>
            </div>
            <div className="task-title-box">
              <h2 className="leftTitles">Tasks for the day:</h2>
            </div>
            <div className="tay-dasks-box">
              {dayTasks.map(task => (
                <div className="dayTaskz">
                  <p>{task.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rightDash">
        <div className="statz">
          <div className="title-div">
            <h1>Todays Activity:</h1>
          </div>
          <div className="activity">
            <div className="info-boxes" id="first-box-info">
              <h4>{followers.length} Followers</h4>
            </div>
            <div className="info-boxes" id="sec-box-info">
            <h4>{followingLength} Following</h4>
            </div>
            <div className="info-boxes" id="third-box-info">
            <h4>{lists.length} Lists</h4>
            </div>
          </div>
        </div>
        <div className="groups-box">
          <GetGroups />
        </div>
      </div>
    </div>
  )
}
