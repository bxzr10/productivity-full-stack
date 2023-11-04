import { MONTHS } from './helper'

// ACTION CREATORS

export const actionLoad = (data) => {
    // console.log('action load');
    return { type: 'load', data: data }
}

export const actionSet = (data) => {
    // console.log('action set');
    return { type: 'set', data: data }
}

export const actionSetCompletedItem = (id) => {
    return { type: 'setComplete', data: {id: id} }
}

export const actionDeleteId = (id) => {
    // console.log('action delete');
    return { type: 'delete', data: id }
}

export const ProjectsReducer = (state = {}, { type, data }) => {
    // console.log('calling PROJECT reducer with state and data', state, type, data);
    switch (type) {
        case 'load': {
            console.log('LOADING ... ');
            const dataObject = {}
            data.forEach(bit => dataObject[bit.id] = bit);
            return ({
                ...dataObject
            })
        }
        case 'set': {
            console.log('SETTING ... ', data);
            return ({
                ...state,
                [data.id]: data,
            })
        }
        case 'delete': {
            console.log('DELETING ... ');
            const { [data]: trash, ...keep } = state;
            return ({
                ...keep
            })
        }
        default:
            return state;
    }
}

export const ItemsReducer = (state = {}, { type, data }) => {
    // console.log('calling ITEM reducer with state', state, type, data);
    switch (type) {
        case 'load': {
            console.log('LOADING ... ');
            const dataObject = {}
            data.forEach(bit => dataObject[bit.id] = bit);
            return ({
                ...dataObject
            })
        }
        case 'set': {
            console.log('SETTING ... ', data);
            return ({
                ...state,
                [data.id]: data,
            })
        }
        // case 'setComplete': {
        //     console.log('SETTING ... ', data);
        //     const item = state[data.id];
        //     const projectID = item.projectID;
        //     const items = state.filter(( item ) => itemID !== data.id && item.status !== 'completed' && item.projectID === projectID )
        //     const projectCompleted = items.length < 1;
        //     if( projectCompleted )
        //     {

        //     }
        //     return ({
        //         ...state,
        //         [data.id]: {
        //             ...item,
        //             status: "completed"
        //         },
        //     })
        // }
        case 'delete': {
            console.log('DELETING ... ');
            const { [data]: trash, ...keep } = state;
            return ({
                ...keep
            })
        }
        default:
            return state;
    }
}


// PROJECT SELECTORS

export const selectAllProjects = (state) => {
    return state;
}

export const selectProjectByMonth = (state, monthIdx) => {
    if (!state) return {};
    const inMonth = {};
    if (monthIdx < 0) {
        Object.keys(state).forEach(id => {
            if (state[id].scheduled_start_ms && new Date(Number(state[id].scheduled_start_ms)).getFullYear() > new Date().getFullYear()) {
                inMonth[id] = state[id];
            }
        })
        return inMonth;
    }
    Object.keys(state).forEach(id => {
        if (state[id].scheduled_start_ms && new Date(Number(state[id].scheduled_start_ms)).getMonth() === monthIdx && new Date(Number(state[id].scheduled_start_ms)).getFullYear() === new Date().getFullYear()) {
            inMonth[id] = state[id];
        }
    })
    return inMonth
}

export const selectScheduledYear = (state, year) => {
    if (!state) return {};
    const byMonth = {};
    MONTHS.forEach((monthName, idx) => {
        const inMonth = Object.keys(state).filter(id => state[id].scheduled_start_ms && new Date(Number(state[id].scheduled_start_ms)).getMonth() === idx && new Date(Number(state[id].scheduled_start_ms)).getFullYear() === year);
        if (inMonth.length > 0) byMonth[monthName.toLowerCase()] = inMonth;
    });
    byMonth['future'] = Object.keys(state).filter(id => state[id].scheduled_start_ms && new Date(Number(state[id].scheduled_start_ms)).getFullYear() > year);
    return byMonth
}

export const selectUnscheduled = (state) => {
    if (!state) return {};
    const unscheduled = {};
    Object.keys(state).forEach(id => {
        if (!state[id].scheduled_start_ms) unscheduled[id] = state[id];
    });
    return unscheduled
}


// ITEM SELECTORS

export const selectItemsInProject = (state, projectId) => {
    // console.log(`${state} items in project`, projectId);
    if (!projectId || !state) return {};
    return Object.keys(state).filter(id => state[id].project_id === projectId).map(id => state[id]);
}

export const selectItemsInProjects = (state, projectIds) => {
    // console.log(`${state} items in ${projectIds} projects`);
    if (!projectIds || !state) return {};
    const byProject = {};
    projectIds.forEach(projectId => {
        const idsInProject = Object.keys(state).filter(id => state[id].project_id === projectId);
        const itemsInProject = idsInProject.map(id => state[id]);
        if (itemsInProject) byProject[projectId] = itemsInProject;
    })
    return byProject
}

export const IsProjectCompleted = (projectId) =>
{
    // find all the items that match the projectID 
    // let isCompleted = true;
    // loop through the items, if any of them are uncompleted
    // return false

    // otherwise finish the loop return true
}