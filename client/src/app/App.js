import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import YearPage from '../components/plan/YearPage';
import MonthPage from '../components/plan/MonthPage';
import ProjectEditor from '../components/editors/ProjectEditor';
import Calendar from '../components/editors/Calendar';
import '../App.css';
import Root from './Root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={ <Root/> }>
            <Route path='' element={ <YearPage/> }/>
            <Route path=':monthName' element={ <MonthPage/> }>
                <Route index element={ <Calendar/> }/>
                <Route path='project' element={ <ProjectEditor/> }/>
            </Route>
        </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App;