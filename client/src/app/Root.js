import React, { useEffect, useReducer } from 'react';
import { ProjectsReducer, actionLoad } from '../util/reducer';
import { useQuery } from '@tanstack/react-query';
import { projectQK, apiGetProjectsAll } from '../util/api';
import { Outlet } from 'react-router-dom';

const useProjectsAllQuery = () => useQuery({ 
    queryKey: projectQK.getAll, 
    queryFn: () => apiGetProjectsAll() });

function Root() {

    const { isLoading, isError, data, error } = useProjectsAllQuery();
    const [ projects, projectDispatch ] = useReducer(ProjectsReducer, data);

    const useProjectSelector = (callback) => {
        return callback(projects);
    }

    useEffect(() => {
        if (data) projectDispatch(actionLoad(data));
    }, [data])

    const outletContext = {
        useProjectSelector,
        projectDispatch,
    }

    return (
        <Outlet context={outletContext}/>
    )
}

export default Root;