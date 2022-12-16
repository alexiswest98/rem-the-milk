const GETALLTASKSDAY = 'tasks/getAllTasksDay'
const GETALLTASKSTOM = 'tasks/getAllTasksTom'
const GETALLTASKSMONTH = 'tasks/getAllTasksMonth'

export const getAllTasksDayAction = (tasks) => {
    return {
        type: GETALLTASKSDAY,
        tasks
    };
};

export const getAllTasksTomAction = (tasks) => {
    return {
        type: GETALLTASKSTOM,
        tasks
    };
};

export const getAllTasksMonthAction = (tasks) => {
    return {
        type: GETALLTASKSMONTH,
        tasks
    };
};


export const getAllTasksByDayThunk = () => async (dispatch) => {
    const response = await fetch('/api/tasks/day');
    if (response.ok) {
        const tasks = await response.json();
        console.log('in the thunk for dayTasks', tasks)
        dispatch(getAllTasksDayAction(tasks));
    };
};

export const getAllTasksByTomThunk = () => async (dispatch) => {
    const response = await fetch('/api/tasks/tomorrow');
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getAllTasksTomAction(tasks));
    };
};

export const getAllTasksByMonthThunk = () => async (dispatch) => {
    const response = await fetch('/api/tasks/month');
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getAllTasksMonthAction(tasks));
    };
};


export default function specTasksReducer(state = {}, action) {
    let newState = {};

    switch (action.type) {

        case GETALLTASKSDAY:
            action.tasks.forEach(task => newState[task.id] = task)
            return newState

        case GETALLTASKSTOM:
            action.tasks.forEach(task => newState[task.id] = task)
            return newState

        case GETALLTASKSMONTH:
            action.tasks.forEach(task => newState[task.id] = task)
            return newState

            default:
                return state
        }
    }