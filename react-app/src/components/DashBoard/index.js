import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom'
import GetGroups from "../allGroups";
import { getAllTasksByDayThunk } from "../../store/specTasks";
// import specTasksReducer from "../../store/specTasks";

export default function Dashboard() {
    const dispatch = useDispatch();


    const dayTasks = Object.values(useSelector(state => state.specTask))
    const lists = Object.values(useSelector(state => state.tasks))
    const currentUser = useSelector(state => state.session)
    const groups = useSelector(state => state.groups)
    useEffect(() => {
        dispatch(getAllTasksByDayThunk())
    }, [dispatch])

    return (
      <div>
<<<<<<< HEAD
        {/* <button onClick={}></button> */}
=======
>>>>>>> testing
      {dayTasks.map(task=>(
        <div>
        <p>{task.name}</p>
        <p>{task.due}</p>
        </div>
      ))}
        {lists.map(list=>(
        <div>
        <p>{list.name}</p>
        </div>
      ))}
      <h3>Todays Activity</h3>
      <div> Lists {lists.length}</div>
      <div>Tasks due today {dayTasks.length}</div>
<<<<<<< HEAD

//       <GetGroups/>
//       </div>
    )
}

// import React, { useState } from "react";
// import React, { useState } from "react";

// function App() {
//   const [showComponent1, setShowComponent1] = useState(true);
// function App() {
//   const [showComponent1, setShowComponent1] = useState(true);

//   return (
//     <div>
//       {showComponent1 ? (
//         <Component1
//           onClick={() => setShowComponent1(false)}
//         />
//       ) : (
//         <Component2
//           onClick={() => setShowComponent1(true)}
//         />
//       )}
//     </div>
//   );
// }
//   return (
//     <div>
//       {showComponent1 ? (
//         <Component1
//           onClick={() => setShowComponent1(false)}
//         />
//       ) : (
//         <Component2
//           onClick={() => setShowComponent1(true)}
//         />
//       )}
//     </div>
//   );
// }

// function Component1(props) {
//   return (
//     <div onClick={props.onClick}>
//       This is component 1.
//     </div>
//   );
// }
// function Component1(props) {
//   return (
//     <div onClick={props.onClick}>
//       This is component 1.
//     </div>
//   );
// }

// function Component2(props) {
//   return (
//     <div onClick={props.onClick}>
//       This is component 2.
//     </div>
//   );
// }
// function Component2(props) {
//   return (
//     <div onClick={props.onClick}>
//       This is component 2.
//     </div>
//   );
// }
=======
      <GetGroups/>

      </div>
    )
}
>>>>>>> testing
