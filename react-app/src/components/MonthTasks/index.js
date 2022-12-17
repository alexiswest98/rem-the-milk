import { useDispatch, useSelector } from "react-redux";
import { getAllTasksByMonthThunk } from "../../store/specTasks";
import React, { useEffect, useState } from "react";


export default function MonthTask() {
    const dispatch = useDispatch();

    const monthTasks = Object.values(useSelector(state => state.specTask))

    useEffect(() => {
        dispatch(getAllTasksByMonthThunk)
    }, [dispatch])

return(

<div>
{monthTasks.map(task=>(
<div>
<p>{task.name}</p>
<p>{task.due.slice(0,17)}</p>
</div>
))}
</div>

)

}