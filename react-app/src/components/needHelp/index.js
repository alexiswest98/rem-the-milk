import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import "./help.css"

function ShowHelp({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()


  return (
    <div className="outer-help-modal">
        <div className="title-div-help">
            <h1>HELPFUL TIPS :)</h1>
        </div>
      <h2 className="yellow-help">FOLLOWING/FOLLOWERS</h2>
        <li>Click on the Followers or Following under Today's Actvity to see accounts.</li>
        <li>You must be following the accounts you wish to add to your team lists.</li>
      <h2 className="yellow-help">GROUP LISTS</h2>
        <li>Click on Create a group to give your group a name and optional photo.</li>
        <li>Click on the specific group card you wish to edit to redirect you to that team page.</li>
        <li>In every Group's page you can add team members (from your following) and create new to do lists.</li>
    <h2 className="yellow-help">HOME</h2>
        <li>This is where you will find all your tasks and due dates for each activity, list, or group list.</li>
        <li>You can edit dates, names, or move tasks to completed here.</li>
    </div>
  )
}



export default ShowHelp;
