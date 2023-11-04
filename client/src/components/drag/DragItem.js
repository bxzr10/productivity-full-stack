import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../../App.css';

function DragItem( { id, title, handleDragEdit, handleDragDelete } ) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ projectTitle, setProjectTitle ] = useState(title);

    const {attributes, listeners, setNodeRef, transform} = 
        useDraggable({id, disabled: isEditing && true});
    const style = transform 
        ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`} 
        : undefined;

    const handleEdit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // finished editing
            setIsEditing(false);
            handleDragEdit(id, projectTitle);
        } else {
            setIsEditing(true);
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}  className='DragItem'>
            <form onSubmit={handleEdit}>
                {isEditing
                    ? <input type='text' value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}/>
                    : <p>{projectTitle}</p>}
                <div className='button-div'>
                    <button type='submit'>{isEditing ? 'save' : 'edit'}</button>
                    <button type='button' onClick={() => handleDragDelete(id)}>X</button>
                </div>
            </form>
        </div>
    );
}

export default DragItem;