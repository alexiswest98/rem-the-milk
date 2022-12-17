import { useDispatch, useSelector } from "react-redux";
import { getAllTasksByTomThunk } from "../../store/specTasks";
import React, { useEffect, useState } from "react";


export default function TommTask() {
    const dispatch = useDispatch();

    const TomTasks = Object.values(useSelector(state => state.specTask))

    useEffect(() => {
        dispatch(getAllTasksByTomThunk())
    }, [dispatch])

return(


<div>
{TomTasks.map(task=>(
<div>
<p>{task.name}</p>
<p>{task.due.slice(0,17)}</p>
</div>
))}
</div>

)

}