import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { apiCreateItem, itemQK } from '../../util/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actionSet } from '../../util/reducer';

function ItemInput( { dispatch, monthName = null, projectId }) {

    const [ subtask, setSubtask ] = useState('');

    const queryClient = useQueryClient();

    const addItem = useMutation({
        mutationFn: (item) => {
            return apiCreateItem(item);
        },
        onSuccess: (data) => {
            console.log('MUTATION SUCCESS', data);
            if (data) dispatch(actionSet(data));
            queryClient.invalidateQueries({ queryKey: itemQK.getAll });
        }
    })

    const handleInput = React.useCallback((e) => {
        e.preventDefault();
        if (!subtask) return;
        const item = {
            id: uuid(),
            title: subtask,
            recurring: false,
            parent_recurrence: null,
            completed_on_ms: null,
            created_on_ms: new Date().getTime(),
            scheduled_start_ms: monthName 
                ? new Date(`${monthName} ${new Date().getFullYear()}`).getTime()
                : monthName,
            scheduled_end_ms: null,
            status: 'incomplete',
            precedence: null,
            in_order: null,
            project_id: projectId
        }
        setSubtask('');
        addItem.mutate(item);
    }, [subtask]);

    return (
        <form id='monthly-item-input' onSubmit={handleInput} 
            disabled={ projectId ? false : true }
            className='item-display-list'>
            <button id='button-new-item'>+</button>
            <input type='text' id='item-input' name='item-input' value={subtask} onChange={(e) => setSubtask(e.target.value)}/>
        </form>
    )
}

export default ItemInput;