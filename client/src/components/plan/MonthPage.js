import React, { useEffect, useReducer, useState } from 'react';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { MONTHS, capitalize } from '../../util/helper';
import { ItemsReducer, actionLoad, selectItemsInProjects, selectProjectByMonth } from '../../util/reducer';
import ProjectInput from '../project/ProjectInput';
import Project from '../project/Project';
import { useQuery } from '@tanstack/react-query';
import { apiGetItemsAll, itemQK } from '../../util/api';

const useItemsAllQuery = () => useQuery({ 
    queryKey: itemQK.getAll, 
    queryFn: () => apiGetItemsAll() });


function MonthPage() {

    const { data: itemData } = useItemsAllQuery();
    const [ items, itemDispatch ] = useReducer(ItemsReducer, itemData);

    const useItemSelector = (callback) => {
        return callback(items);
    }

    const { useProjectSelector, projectDispatch } = useOutletContext();
    const { monthName } = useParams();
    const monthIdx = MONTHS.findIndex(month => month.toLowerCase() === monthName.toLowerCase());

    const projects = useProjectSelector(state => selectProjectByMonth(state, monthIdx));
    const itemsByProjects = useItemSelector(state => selectItemsInProjects(state, Object.keys(projects)));

    const [ outletProps, setOutletProps ] = useState({
        project: null,
        projectDispatch,
        useItemSelector,
        itemDispatch,
        itemsByProjects: null,
    })

    useEffect(() => {
        console.log("HI!")
        if (itemData) itemDispatch(actionLoad(itemData));
        setOutletProps(prev => ({ ...prev, itemsByProjects})); // need this to update after a new item is submitted - works together with the setOutletProps in Project > onclick
    }, [itemData])

    const navigate = useNavigate();

    return (
        <div id='MonthPage'>
            <div className='project-display-container'>
                <div className='header-container header-left'>
                    <h1 className='header-clickable' onClick={() => navigate('/')}>&lt;=</h1>
                    <h1>Projects for {capitalize(monthName)}</h1>
                </div>
                <ProjectInput dispatch={projectDispatch} monthIdx={monthIdx}/>
                <div className='project-list-container'>
                    {Object.keys(projects).map(id => <Project key={id} project={projects[id]} itemsByProjects={itemsByProjects} setOutletProps={setOutletProps} itemDispatch={itemDispatch} projectDispatch={projectDispatch}/>)}
                </div>
            </div>
            <Outlet context={outletProps}/>
        </div>
    )
}

export default MonthPage;