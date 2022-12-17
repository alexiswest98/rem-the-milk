import { useDispatch, useSelector } from "react-redux";
import { getAllTasksByDayThunk } from "../../store/specTasks";
import React, { useEffect, useState } from "react";


export default function DayTask() {
    const dispatch = useDispatch();

    const dayTasks = Object.values(useSelector(state => state.specTask))

    useEffect(() => {
        dispatch(getAllTasksByDayThunk())
    }, [dispatch])

return(


<div>
{dayTasks.map(task=>(
<div>
<p>{task.name}</p>
<p>{task.due.slice(0,17)}</p>
</div>
))}
</div>

)

}