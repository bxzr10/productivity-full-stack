import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from './Item';
import { apiUpdateProject } from '../../util/api';
import { useMutation } from '@tanstack/react-query';
import { actionSet } from '../../util/reducer';

function Project( { project, itemsByProjects, setOutletProps, itemDispatch, projectDispatch } ) {

    const navigate = useNavigate();

    // const updateProject = useMutation({
    //     mutationFn: (project) => {
    //         return apiUpdateProject(project);
    //     },
    //     onSuccess: (data) => {
    //         console.log('PROJECT UPDATE MUTATION SUCCESS', data);
    //         if (data) projectDispatch(actionSet(data));
    //     }
    // })

    // useEffect(() => {
    //     const incomplete = itemsByProjects[project.id].filter(item => item.status !== 'complete');
    //     console.log('INCOMPLETE ARRAY', incomplete);
    //     if (incomplete.length === 0) {
    //         project['completed_on_ms'] = new Date().getTime();
    //         project['status'] = 'complete';
    //         console.log('PROJECT COMPLETED !!');
    //         updateProject.mutate(project);
    //     }
    // }, []);

    const handleClick = () => {
        setOutletProps(prev => ({ 
            ...prev, 
            project,
            itemsByProjects }));
        navigate('project');
    }

    const formatStartEndDate = () => {
        if (!project || !project.scheduled_start_ms) return '';
        const hasDiffEnd = project.scheduled_end_ms !== project.scheduled_start_ms 
            ? '- ' + new Date(Number(project.scheduled_end_ms)).toDateString() 
            : '';
        return new Date(Number(project.scheduled_start_ms)).toDateString() + hasDiffEnd
    }

    return (
        <div className='Project' onClick={handleClick}>
            {project?.title}
            <br/>
            {formatStartEndDate()}
            {project && itemsByProjects && Object.keys(itemsByProjects).length > 0
                ? itemsByProjects[project.id].filter(item => item.status === 'incomplete').map(item => <Item key={item.id} item={item} dispatch={itemDispatch}/>)
                : null
            }
        </div>
    )
}

export default Project;