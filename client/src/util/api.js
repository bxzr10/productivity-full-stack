export const projectQK = {
    'getAll': ['projects', 'getAll'],
    'getId': ['projects', 'getId'],
    'getMonth': ['projects', 'getMonth'],
    'update': ['projects', 'update'],
    'create': ['projects', 'create'],
    'delete': ['projects', 'delete'],
}

export const apiGetProjectsAll = async () => {
    const res = await fetch('/projects/')
        .then(response => response)
        .catch(error => {
            throw new Error(error)});
    
    const json = await res.json();
    return json.data;
}

// export const apiGetProjectById = async (id) => {
//     const res = await fetch(`/projects/${id}`)
//         .then(response => response)
//         .catch(error => {
//             throw new Error(error)});
    
//     const json = await res.json();
//     return json.data;
// }

export const apiUpdateProject = async (project) => {
    const { id, ...newProject } = project;
    console.log('Calling update API', project.title, project.scheduled_start_ms, new Date(Number(project.scheduled_start_ms)));
    const res = await fetch('/projects/update', {
        method: 'PUT',
        body: JSON.stringify({
            id,
            valuesArray: Object.values(newProject),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    const json = await res.json();
    return json.data;
}

export const apiCreateProject = async (project) => {
    const { id, ...newProject } = project;
    const res = await fetch('/projects/create', {
        method: 'POST',
        body: JSON.stringify({
            id,
            valuesArray: Object.values(newProject),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    const json = await res.json();
    return json.data;
}

export const apiDeleteProject = async (id) => {
    await fetch(`/projects/delete/${id}`, {
        method: 'DELETE',
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    return id;
}





export const itemQK = {
    'getAll': ['items', 'getAll'],
    'getId': ['items', 'getId'],
    'getMonth': ['items', 'getMonth'],
    'update': ['items', 'update'],
    'create': ['items', 'create'],
    'delete': ['items', 'delete'],
}

export const apiGetItemsAll = async () => {
    const res = await fetch('/items/')
        .then(response => response)
        .catch(error => {
            throw new Error(error)});
    
    const json = await res.json();
    return json.data;
}

export const apiGetItemsByMonth = async (monthName) => {
    const res = await fetch(`/items/${monthName}`)
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    const json = await res.json();
    console.log('api returned json for item', json);
    return json.data;
}

export const apiUpdateItem = async (item) => {
    const { id, ...newItem } = item;
    console.log('Calling update API', item.title, item.scheduled_start_ms, new Date(Number(item.scheduled_start_ms)));
    const res = await fetch('/items/update', {
        method: 'PUT',
        body: JSON.stringify({
            id,
            valuesArray: Object.values(newItem),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    const json = await res.json();
    return json.data;
}

export const apiCreateItem = async (item) => {
    const { id, ...newItem } = item;
    const res = await fetch('/items/create', {
        method: 'POST',
        body: JSON.stringify({
            id,
            valuesArray: Object.values(newItem),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    const json = await res.json();
    return json.data;
}

export const apiDeleteItem = async (id) => {
    await fetch(`/itemse/delete/${id}`, {
        method: 'DELETE',
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error)});

    return id;
}