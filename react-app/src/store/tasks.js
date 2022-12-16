const CREATETASK = 'tasks/createTask'
const GETALLTASKS = 'tasks/getAllTasks'
const GETONETASK = 'tasks/getOneTask'
const GETLISTTASKS = 'tasks/getListTasks'
const DELETETASK = 'tasks/deleteTask'
const UPDATETASK = 'tasks/updateTask'

/* ___________ Action Creators   ___________ */
export const getAllTasksAction = (tasks) => {
    return {
        type: GETALLTASKS,
        tasks
    };
};


export const getOneTaskAction = (task) => {
    return {
        type: GETONETASK,
        task
    };
};

export const getListTasksAction = (tasks) => {
  return {
    type: GETLISTTASKS,
    tasks
  }
}

export const createTaskAction = (task) => {
    return {
        type: CREATETASK,
        task
    };
};

export const deleteTaskAction = (taskId) => {
    return {
        type: DELETETASK,
        taskId
    };
};

export const updateTaskAction = (task) => {
    return {
        type: UPDATETASK,
        task
    };
};

/* ___________ T H U N K S   ___________ */

export const completeTaskThunk = (task, task_id) => async (dispatch) => {
    console.log('we made it to the thunk')
    const response = await fetch(`/api/tasks/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify(task)
    });
    if (response.ok) {
        console.log('response = ', response)
        const editedTask = await response.json();
        dispatch(updateTaskAction(editedTask));
        return editedTask;
    }else{
        console.log('unsuccessful response = ',response)
    };
};

// Create a task
export const createTaskThunk = (task) => async (dispatch) => {
    const response = await fetch('/api/tasks/new', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(task)
    });
    console.log('response =', response)
    if (response.ok) {
        const newTask = await response.json();
        console.log("The new task in the Thunk", newTask)
        dispatch(createTaskAction(newTask))
        return newTask
    };
};

// Get all the tasks
export const getAllTasksThunk = () => async (dispatch) => {
    const response = await fetch('/api/tasks/all');
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getAllTasksAction(tasks));
    };
};



//get all tasks for list
export const getAllListTasksThunk = (list_id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/lists/${list_id}`)
  if (response.ok) {
    const tasks = await response.json()
    dispatch(getListTasksAction(tasks))
  }
}

// Update a task
export const editTaskThunk = (task) => async (dispatch) => {
    const {id, name, due, notes, list_id, user_id, completed_by} = task
    console.log(task)
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name,
            due,
            user_id,
            notes,
            list_id,
            completed_by
        })
    });
    console.log('res = ', response)
    if (response.ok) {
        const editedTask = await response.json();
        dispatch(updateTaskAction(editedTask));
        console.log('Res.ok and dispatch hit.')
        console.log('data = ',editedTask)
        return editedTask;
    };
};

// Delete a task
export const deleteTaskThunk = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) dispatch(deleteTaskAction(taskId))
};

/* ___________ Tasks Reducer   ___________ */

export default function tasksReducer(state = {}, action) {
    let newState = {};

    switch (action.type) {

        case GETALLTASKS:
            action.task.forEach(task => newState[task.id] = task)
            return newState

        case GETLISTTASKS:
            action.tasks.forEach(task => newState[task.id] = task)
            return newState

        case UPDATETASK:
            newState={...state}
            newState[action.task.id] = { ...newState[action.task.id], ...action.task };
            return newState;

        case DELETETASK:
            newState = { ...state }
            delete newState[action.taskId]
            return newState

        case CREATETASK:
            newState = { ...state }
            newState[action.task.id] = action.task
            return newState

        default:
            return state
    }
}
