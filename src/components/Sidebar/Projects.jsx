import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilter } from '../../features/filter/filterSlice';
import { useGetProjectsQuery } from '../../features/project/projectApi';
import Error from '../shared/Error';
import Loading from '../shared/Loading';

const Projects = () => {
    const { data: projects, isLoading, isError } = useGetProjectsQuery();
    const dispatch = useDispatch();
    const { filter } = useSelector(state => state.filter)

    // print on the ui 
    let content = null;
    if (isLoading) content = <Loading msg="Loading projects..." />;
    if (isError) content = <Error error="Error loading projects" />;
    if (!isError && !isLoading && projects.length < 1) content = <Error error="No projects found" />;
    if (!isError && !isLoading && projects.length > 0) content = projects.map(project => {
        const { id, projectName, colorClass } = project;
        return <div key={id} className="checkbox-container">
            <input id={projectName}
                type="checkbox"
                checked={filter.includes(projectName)}
                onChange={() => dispatch(applyFilter(projectName))}

                className={colorClass} />
            <label htmlFor={projectName} className="label">{projectName}</label>
        </div>
    })

    return (
        <>
            <h3 onClick={() => dispatch(applyFilter("hello"))} className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </>

    )
}

export default Projects