const CREATETASK = 'tasks/createTask'
const GETALLTASKS = 'tasks/getAllTasks'
const GETONETASK = 'tasks/getOneTask'
const GETLISTTASKS = 'tasks/getListTasks'
const DELETETASK = 'tasks/deleteTask'
const UPDATETASK = 'tasks/updateTask'

/* ___________ Action Creators   ___________ */
export const getAllTasksAction = (task) => {
    return {
        type: GETALLTASKS,
        task
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

// Create a task
export const createTaskThunk = (task) => async (dispatch) => {

    const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const newTask = await response.json();
        createTaskAction(newTask)
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
export const editTaskThunk = (task, taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(task)
    });
    if (response.ok) {
        const editedTask = await response.json();
        dispatch(updateTaskAction(editedTask));
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
            action.tasks.forEach(task => newState[task.id] = task)
            return newState

        case GETLISTTASKS:
            action.tasks.forEach(task => newState[task.id] = task)
            return newState
            
        case UPDATETASK:
            newState = { ...state }
            newState[ action.task.id ] = action.task
            return newState

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
