import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Link } from 'react-router-dom';

function DropArea( { id, children, useNav } ) {
    const {isOver, setNodeRef} = useDroppable({id});
    const style = {
        border: isOver ? '1px solid red' : undefined,
    };
    
    return (
        <div ref={setNodeRef} style={style} className='DropArea'>
            {useNav
                ? <Link to={`/${id.toLowerCase()}`} className='drop-area-title'>{id}</Link>
                : <p className='drop-area-title'>{id}</p>}
            {children}
        </div>
    );
}

export default DropArea;