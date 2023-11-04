import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { apiCreateProject } from '../../util/api';
import { useMutation } from '@tanstack/react-query';
import { actionSet } from '../../util/reducer';

function ProjectInput( { dispatch, monthIdx = null }) {

    const [ goal, setGoal ] = useState('');

    const addProject = useMutation({
        mutationFn: (project) => {
            console.log('mutating');
            return apiCreateProject(project);
        },
        onSuccess: (data) => {
            if (data) dispatch(actionSet(data));
        }
    })

    const handleInput = React.useCallback((e) => {
        e.preventDefault();
        if (!goal) return;
        const project = {
            id: uuid(),
            title: goal,
            completed_on_ms: null,
            created_on_ms: new Date().getTime(),
            scheduled_start_ms: monthIdx 
                ? new Date(new Date().getFullYear(), monthIdx + 1, 0).getTime()
                : monthIdx,
            scheduled_end_ms: monthIdx
            ? new Date(new Date().getFullYear(), monthIdx + 1, 0).getTime()
            : monthIdx,
            status: 'incomplete',
        }
        setGoal('');
        addProject.mutate(project);
    }, [goal]);

    return (
        <form id='monthly-project-input' onSubmit={handleInput}>
            <label htmlFor='project-input'>Add a project:</label>
            <input type='text' id='project-input' name='project-input' value={goal} onChange={(e) => setGoal(e.target.value)}/>
        </form>
    )
}

export default ProjectInput;