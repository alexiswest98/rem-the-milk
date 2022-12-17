import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { getAllTasksThunk } from "../../store/tasks";
import { GetAllListsThunk, DeleteListThunk } from "../../store/lists";
import CompleteTasksPage from "./completedTasks";
import './index.css'
import CreateListModal from "../Lists";
import EditListModal from "../EditList";
import CreateTaskModal from "../simpTasks";


export default function CompTaskPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    // const Tasks = Object.values(useSelector(state => state.tasks))
    const Lists = Object.values(useSelector(state => state.lists))

    const aloneLists = Lists.filter(list => list.group_id == null)
    const groupLists = Lists.filter(list => list.group_id !== null)
    // console.log("********", groupLists)



    const createList = () => {
        console.log('clicked')
    }
    const incomOnClick = () => {
        history.push('/home')
    }

    const complOnClick = () => {
        history.push('/tasks/completed')
    }

    useEffect(() => {
        dispatch(getAllTasksThunk())
        dispatch(GetAllListsThunk())
    }, [dispatch])

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
                                <Link to={'/home'}>
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
                                <CreateTaskModal/>
                            </div>
                            <div className="nav-list-option">
                                <h2>Lists</h2>
                                <div className="listMapped">

                                {aloneLists.map(list => (
                                    <Link to={`/lists/${list.id}`}>
                                    <h4>{list.name} <EditListModal listId={list.id}/></h4>
                                    </Link>
                                ))}
                                <CreateListModal/>
                            </div>
                                </div>
                            <div className="nav-group-list-option">
                                <h4>Group Lists</h4>
                                {groupLists.map(list => (
                                    <Link to={`/lists/${list.id}`}>
                                    <h4>{list.name} <EditListModal listId={list.id}/></h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-page">
                    <div className="completed-butts-div">
                        <button onClick={() => incomOnClick()} className="comp-butt">Incompleted</button>
                        <button onClick={() => complOnClick()} className="incomp-butt">Completed</button>
                    </div>
                    <div className="center-box-outline">
                        {/* enter component here */}
                        <CompleteTasksPage/>
                    </div>
                </div>
                <div className="clock-side">
                    <img src="https://cb2.scene7.com/is/image/CB2/CarloMrblBlkWllClckSHS19/$web_pdp_main_carousel_sm$/190410160814/carlo-black-marble-wall-clock.jpg" alt="clock" className="clock"/>
                </div>
        </div>
        </div>
    )
}
