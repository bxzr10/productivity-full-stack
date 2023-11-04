import React from 'react';
import DragItem from '../drag/DragItem';
import DropArea from '../drop/DropArea';
import { ExtPointerSensor } from '../drag/ExtPointerSensor';
import { DndContext, useSensor } from '@dnd-kit/core';
import { MONTHS } from '../../util/helper';
import { apiDeleteProject, apiUpdateProject, projectQK } from '../../util/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actionDeleteId, actionSet,
    selectAllProjects, selectScheduledYear, selectUnscheduled } from '../../util/reducer';

function Dnd( { useSelector, dispatch } ) {

    const dropAreas = [...MONTHS, 'Future'];
    const projects = useSelector(selectAllProjects);
    const unscheduled = useSelector(selectUnscheduled);
    const scheduled = useSelector(state => selectScheduledYear(state, new Date().getFullYear()));
    const queryClient = useQueryClient();
    
    const updateProject = useMutation({
        mutationFn: (project) => {
            return apiUpdateProject(project);
        },
        onSuccess: (data) => {
            console.log('UPDATE MUTATION SUCCESS', data);
            if (data) dispatch(actionSet(data));
        }
    })

    const deleteProject = useMutation({
        mutationFn: (id) => {
            return apiDeleteProject(id);
        },
        onSuccess: (data) => {
            console.log('DELETE MUTATION SUCCESS', data);
            if (data) dispatch(actionDeleteId(data));
            queryClient.invalidateQueries({ queryKey: projectQK.getAll });
        }
    })

    const updateAction = (id, field, newValue) => {
        const project = projects[id];
        project[field] = newValue;
        updateProject.mutate(project);
    }

    const findLastValidDate = (current, target) => {
        const currentDay = new Date(Number(current)).getDate();
        const targetDate = new Date(new Date().getFullYear(), MONTHS.findIndex(month => month.toLowerCase() === target.toLowerCase()) + 1, 0);
        if (targetDate.getDate() < currentDay) {
            return targetDate.getTime();
        }
        return new Date(new Date().getFullYear(), MONTHS.findIndex(month => month.toLowerCase() === target.toLowerCase()), new Date(Number(current)).getDate()).getTime()
    }

    const handleDragEnd = (e) => {
        const { active, over } = e;
        console.log('DRAG EVENT', e);
        const project = projects[active.id];
        if (over.id === 'Future') {
            project['scheduled_start_ms'] = new Date(new Date().getFullYear()+1, 0).getTime();
            project['scheduled_end_ms'] = new Date(new Date().getFullYear()+1, 0).getTime();
        } else if (over) {
            const newDate = project.scheduled_start_ms
                ? findLastValidDate(project.scheduled_start_ms, over.id)
                : new Date(new Date().getFullYear(), MONTHS.findIndex(month => month.toLowerCase() === over.id.toLowerCase()) + 1, 0).getTime()
            if (project.scheduled_end_ms === project.scheduled_start_ms) {
                project['scheduled_start_ms'] = newDate;
                project['scheduled_end_ms'] = newDate;
            } else {
                const duration = project.scheduled_end_ms - project.scheduled_start_ms;
                project['scheduled_start_ms'] = newDate;
                project['scheduled_end_ms'] = newDate + duration;
            }
        } else {
            project['scheduled_start_ms'] = null;
            project['scheduled_end_ms'] = null;
        }
        updateProject.mutate(project);
    }

    const handleDragEdit = (id, title) => {
        updateAction(id, 'title', title);
    }

    const handleDragDelete = (id) => {
        deleteProject.mutate(id);
    }

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={[useSensor(ExtPointerSensor)]}>
            <p>Unparented goals:</p>
            <div className='drag-item-container'>
                {Object.keys(unscheduled).map(id => <DragItem key={id} id={id} title={projects[id].title} handleDragEdit={handleDragEdit} handleDragDelete={handleDragDelete}/>)}
            </div>
            <p>Goals by month:</p>
            <div className='drop-area-container'>
                {dropAreas.map((monthName, i) => (
                    <DropArea key={monthName} id={monthName} useNav={true}>
                        {scheduled[monthName.toLowerCase()]?.map(id => <DragItem key={id} id={id} title={projects[id].title} handleDragEdit={handleDragEdit} handleDragDelete={handleDragDelete}/>)}
                    </DropArea>
                ))}
            </div>
        </DndContext>
    )
}

export default Dnd;