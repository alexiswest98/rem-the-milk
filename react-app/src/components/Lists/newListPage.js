import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getAllListTasksThunk, getAllTasksThunk } from "../../store/tasks";
import { GetAllListsThunk } from "../../store/lists";
import IncompleteTasksPage from "../ListTasks/incompleteTasks";
import ListPage from "./listPage";
import CreateListModal from "../Lists";
import EditListModal from "../EditList";
import CreateTaskModal from "../simpTasks";
import CurrentTime from "../AlarmClock/AlarmClock";

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

    const uncompletedTasks = Tasks.filter(task => task.completed_by == null).length
    const completedTasks = Tasks.filter(task => task.completed_by == user.id ).length
    const allTasks = Tasks.length


    // const incomOnClick = () => {
    //     history.push('/tasks/incomplete')
    // }

    // const complOnClick = () => {
    //     history.push('/tasks/completed')
    // }

    useEffect(() => {
        dispatch(getAllListTasksThunk(listId))
        dispatch(GetAllListsThunk())
    }, [dispatch, listId])

    return (
        <div className="whole-user-home-page">
            <div className="home-page-outer">
                <div className="home-action-nav-bar">
                    <div className="home-profile-image">
                        <img src={user.image_url} alt="profile pic" className="home-prof-pic" />
                        <h3 className="home-user-name">{user.username}</h3>
                        <h4 className="home-user-email">{user.email}</h4>
                    </div>
                    <div className="home-profile-info">
                        <div className="bubble-info-box">
                            <div className="bubble-info-indiv">
                                <div className="bubb-inside-contain" id="right-border-bubb">
                                <h4>{completedTasks}</h4>
                                <span className="need-contain">done</span>
                                </div>
                            </div>
                            <div className="bubble-info-indiv">
                                <div className="bubb-inside-contain" id="right-border-bubb">
                                <h4>{uncompletedTasks}</h4>
                                <span>to do</span>
                                </div>
                            </div>
                            <div className="bubble-info-indiv">
                                <div className="bubb-inside-contain">
                                <h4>{allTasks}</h4>
                                <span>all</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-profile-nav">
                        <h2 className="inbox-title">Inbox</h2>
                        <div className="outer-nav-outline">
                            <div className="nav-task-option">
                                <Link to={'/home'}>
                                    <h4 className="inbox-info-titles">All Tasks</h4>
                                </Link>
                                <Link to={'/tasks/today'}>
                                    <h4 className="inbox-info-titles">Today</h4>
                                </Link>
                                <Link to={'/tasks/tomorrow'}>
                                    <h4 className="inbox-info-titles">Tomorrow</h4>
                                </Link>
                                <Link to={'/tasks/month'}>
                                    <h4 className="inbox-info-titles">Month</h4>
                                </Link>
                                <CreateTaskModal />
                            </div>
                            <div className="nav-list-option">
                                <h3>Lists</h3>
                                <div className="listMapped">
                                    {aloneLists.map(list => (
                                        <Link to={`/lists/${list.id}`}>
                                            <h4 className="inbox-info-titles">{list.name} <EditListModal listId={list.id} /></h4>
                                        </Link>
                                    ))}
                                    <CreateListModal />
                                </div>
                            </div>
                            <div className="nav-list-option">
                                <h3>Group Lists</h3>
                                <div className="listMapped">
                                {groupLists.map(list => (
                                    <Link to={`/lists/${list.id}`}>
                                        <h4 className="inbox-info-titles">{list.name} <EditListModal listId={list.id} /></h4>
                                    </Link>
                                ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="center-page">
                    <div className="center-box-outline">
                        {/* enter component here */}
                        <ListPage />
                    </div>
                </div>
                <div className="clock-side">
                    <CurrentTime/>
                </div>
            </div>
        </div>
    )
}
