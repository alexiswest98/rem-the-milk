import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom'
import GetGroups from "../allGroups";
// import './index.css'
import { getAllTasksByDayThunk } from "../../store/specTasks";
import { GetAllListsThunk } from "../../store/lists";
// import specTasksReducer from "../../store/specTasks";

export default function Home() {


    return (
    <div className="mainDiv">
        <h1>The smart to-do app for busy people.</h1>
    </div>
    )
}