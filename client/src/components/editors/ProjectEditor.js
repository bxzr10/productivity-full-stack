import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { actionSet, actionDeleteId } from '../../util/reducer';
import { apiUpdateProject, apiDeleteProject, projectQK } from '../../util/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MONTHS, formatInputDate, formatProjectDate } from '../../util/helper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ItemInput from '../project/ItemInput';
import Item from '../project/Item';

function ProjectEditor() {

    const { project, projectDispatch, useItemSelector, itemDispatch, itemsByProjects } = useOutletContext();
    const navigate = useNavigate();
    const { monthName } = useParams();

    useEffect(() => {
        if (!project) {
            navigate(`/${monthName}`);
        }
    }, []);

    const queryClient = useQueryClient();

    const [ isEditing, setIsEditing ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ error, setError ] = useState('');

    const updateProject = useMutation({
        mutationFn: (project) => {
            return apiUpdateProject(project);
        },
        onSuccess: (data) => {
            console.log('PROJECT UPDATE MUTATION SUCCESS', data);
            if (data) projectDispatch(actionSet(data));
            if (new Date(Number(data.scheduled_start_ms)).getMonth() !== MONTHS.findIndex(month => month.toLowerCase() === monthName)) {
                navigate(`/${monthName}`);
            }
        }
    })

    const deleteProject = useMutation({
        mutationFn: (id) => {
            return apiDeleteProject(id);
        },
        onSuccess: (data) => {
            console.log('PROJECT DELETE MUTATION SUCCESS', data);
            if (data) projectDispatch(actionDeleteId(data));
            queryClient.invalidateQueries({ queryKey: projectQK.getAll });
            navigate(`/${monthName}`);
        }
    })

    const handleTitleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!title) return;
        project['title'] = title;
        setTitle('');
        setIsEditing(false);
        updateProject.mutate(project);
    }

    const handleStartDateChange = (e) => {
        setError('');
        const startTime = e.getTime();
        const duration = project.scheduled_end_ms - project.scheduled_start_ms;
        project['scheduled_start_ms'] = startTime;
        project['scheduled_end_ms'] = startTime + duration;
        updateProject.mutate(project);
    }

    const handleEndDateChange = (e) => {
        setError('');
        const endTime = e.getTime();
        console.log('???', new Date(Number(project.scheduled_end_ms)), e, new Date(Number(endTime)))
        if (endTime < project.scheduled_start_ms) {
            setError('Cannot have end date before the start date');
            return;
        };
        project['scheduled_end_ms'] = endTime;
        updateProject.mutate(project);
    }

    const handleNextYear = (e) => {
        console.log(new Date(new Date().getFullYear()+1, 0))
        project['scheduled_start_ms'] = new Date(new Date().getFullYear()+1, 0).getTime();
        project['scheduled_end_ms'] = new Date(new Date().getFullYear()+1, 0).getTime();
        updateProject.mutate(project);
    }

    const handleDrop = (e) => {
        project['scheduled_start_ms'] = null;
        project['scheduled_end_ms'] = null;
        updateProject.mutate(project);
    }

    return (
        <div id='ProjectEditor' className='Outlet'>
            <form className='header-container header-right' onSubmit={handleTitleSubmit}>
                {isEditing
                    ? <input type='text' 
                        autoFocus={ isEditing ? true : false }
                        onFocus={(e) => e.target.select()} 
                        value={ title ? title : project?.title } 
                        onChange={(e) => setTitle(e.target.value)}/>
                    : <h1 onDoubleClick={() => setIsEditing(true)}>{title ? title : project?.title}</h1>}
                <h1 className='header-clickable' onClick={() => navigate(`/${monthName}`)}>X</h1>
            </form>
            <div className='select-date-container'>
                <label htmlFor='select-startdate' className='editor-field'>Change start date:</label>
                <DatePicker id='select-startdate'
                    className='editor-field'
                    value={ project ? formatProjectDate(project.scheduled_start_ms) : '' }
                    openToDate={ project ? new Date(Number(project.scheduled_start_ms)) : undefined }
                    onSelect={handleStartDateChange}
                />
            </div>
            <div className='select-date-container'>
                <label htmlFor='select-enddate' className='editor-field'>Change end date:</label>
                <DatePicker id='select-enddate'
                    className='editor-field'
                    value={ project ? formatProjectDate(project.scheduled_end_ms) : '' }
                    openToDate={ project ? new Date(Number(project.scheduled_end_ms)) : undefined }
                    onSelect={handleEndDateChange}
                />
            </div>
            <div className='select-date-button-container'>
                <button type='button' className='button-action'
                    disabled={ project ? false : true }
                    onClick={handleNextYear}>
                    Move project to next year
                </button>
                <button type='button' className='button-action'
                    disabled={ project ? false : true }
                    onClick={handleDrop}>
                    Drop project
                </button>
            </div>
            <div>
                <h3>Subtasks:</h3>
                <div className='item-display-container'>
                    <ItemInput dispatch={itemDispatch} monthName={monthName} projectId={project?.id}/>
                    {itemsByProjects && project
                        ? itemsByProjects[project.id].map(item => <Item key={item.id} item={item} dispatch={itemDispatch}/> )
                        : null }
                </div>
            </div>
            <div className='error-container'>
                { error? 'Oops! '+error : null }
            </div>
            <div>
                <button type='button' className='button-delete' 
                    disabled={ project ? false : true } 
                    onClick={() => deleteProject.mutate(project.id)}>
                    DELETE PROJECT
                </button>
            </div>
        </div>
    )
}

export default ProjectEditor;