import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getAllListTasksThunk, getAllTasksThunk } from "../../store/tasks";
import { GetAllListsThunk } from "../../store/lists";
import IncompleteTasksPage from "../Tasks/incompleteTasks";
import ListPage from "./listPage";
import CreateListModal from "./index";
import EditListModal from "../EditList";
// import './index.css'

export default function NewListPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const Tasks = Object.values(useSelector(state => state.tasks))
    const Lists = Object.values(useSelector(state => state.lists))
    const {listId} = useParams()

    const aloneLists = Lists.filter(list => list.group_id === null)
    const groupLists = Lists.filter(list => list.group_id !== null)
    // console.log("********", groupLists)


    const createList = () => {
        console.log('clicked')
    }

    const incomOnClick = () => {
        history.push('/tasks/incomplete')
    }

    const complOnClick = () => {
        history.push('/tasks/completed')
    }

    useEffect(() => {
        dispatch(getAllListTasksThunk(listId))
        dispatch(GetAllListsThunk())
    }, [dispatch, listId])

    return (
        <div className="whole-user-home-page">
        <div className="home-page-outer">
                <div className="home-action-nav-bar">
                    <div className="home-profile-image">
                        <img src={user.image_url} alt="profile pic" className="home-prof-pic"/>
                        <h3 className="home-user-name">{user.username}</h3>
                        <h4 className="home-user-email">{user.email}</h4>
                    </div>
                    <div className="home-profile-info">
                        <div className="bubble-info-box">

                        </div>
                    </div>
                    <div className="home-profile-nav">
                        <h4>Inbox</h4>
                        <div className="outer-nav-outline">
                            <div className="nav-task-option">
                                <Link to={'/tasks/all'}>
                                    <h4>All Tasks</h4>
                                </Link>
                                <Link to={'/tasks/today'}>
                                    <h4>Today</h4>
                                </Link>
                                <Link to={'/tasks/tomorrow'}>
                                    <h4>Tomorrow</h4>
                                </Link>
                                <Link to={'/tasks/month'}>
                                    <h4>Month</h4>
                                </Link>
                            </div>
                            <div className="nav-list-option">
                                <h2>Lists</h2>
                                {aloneLists.map(list => (
                                    <Link to={`/lists/${list.id}`}>
                                    <h4>{list.name} <EditListModal listId={list.id}/></h4>
                                    </Link>
                                ))}
                                <CreateListModal/>
                            </div>
                            <div className="nav-group-list-option">
                                <h4>Group Lists</h4>
                                {groupLists.map(list => (
                                    <h4>{list.name}</h4>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-page">
                    <div className="completed-butts-div">
                        {/* <button onClick={() => incomOnClick()} className="comp-butt">Incompleted</button>
                        <button onClick={() => complOnClick()} className="incomp-butt">Completed</button> */}
                    </div>
                    <div className="center-box-outline">
                        {/* enter component here */}
                        <ListPage/>
                    </div>
                </div>
                <div className="clock-side">
                    <img src="https://cb2.scene7.com/is/image/CB2/CarloMrblBlkWllClckSHS19/$web_pdp_main_carousel_sm$/190410160814/carlo-black-marble-wall-clock.jpg" alt="clock" className="clock"/>
                </div>
        </div>
        </div>
    )
}
