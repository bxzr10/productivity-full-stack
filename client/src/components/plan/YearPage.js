import React from 'react';
import ProjectInput from '../project/ProjectInput';
import { useOutletContext } from 'react-router-dom';
import Dnd from './Dnd';

function YearPage() {

    const { useProjectSelector, projectDispatch } = useOutletContext();

    return (
        <div>
            <h1>Year at a glance</h1>
            <ProjectInput dispatch={projectDispatch}/>
            <Dnd useSelector={useProjectSelector} dispatch={projectDispatch} />
        </div>
    )
}

export default YearPage;