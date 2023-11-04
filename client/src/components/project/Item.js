import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiUpdateItem } from '../../util/api';
import { actionSet } from '../../util/reducer';

function Item( { item, dispatch } ) {

    const updateItem = useMutation({
        mutationFn: (item) => {
            return apiUpdateItem(item);
        },
        onSuccess: (data) => {
            console.log('MUTATION SUCCESS', data);
            if (data) dispatch(actionSet(data));
            
        }
    })

    const handleItemStatus = (e) => {
        const newStatus = item.status === 'incomplete' ? 'complete' : 'incomplete';
        item['status'] = newStatus;
        if (newStatus === 'incomplete') {
            item['completed_on_ms'] = null;
            item['status'] = 'incomplete';
        } else {
            item['completed_on_ms'] = new Date().getTime();
            item['status'] = 'complete';
        }
        updateItem.mutate(item);
    }

    return (
        <div className='item-display-list'>
            <button type='button' className='button-invisible'
                onClick={handleItemStatus}>
                {item.status === 'incomplete'
                    ? '◻️'
                    : '✅' }
            </button>
            {item.title}{ item.completed_on_ms ? ' // ' + new Date(Number(item.completed_on_ms)).toDateString() : null}
        </div>
    )
}

export default Item;