import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../features/project/projectApi';
import { useAddTaskMutation, useEditTaskMutation, useGetTaskQuery } from '../features/tasks/tasksApi';
import { useGetTeamQuery } from '../features/team/teamApi';

const EditTask = () => {
    const { taskId } = useParams();
    const { data: team } = useGetTeamQuery();
    const { data: projects } = useGetProjectsQuery();
    const { data: task, isSuccess } = useGetTaskQuery(taskId);
    const [editTask, { isError, isSuccess: updateSuccess, isLoading }] = useEditTaskMutation();

    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        taskName: "",
        name: "",
        projectName: "",
        deadline: "",
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setFormInput(pre => ({
            ...pre,
            [name]: value,
        }));
    }

    useEffect(() => {
        if (isSuccess) {
            setFormInput({
                taskName: task?.taskName,
                name: task?.teamMember.name,
                projectName: task?.project.projectName,
                deadline: task?.deadline,
            })
        }
        if (updateSuccess) navigate("/")
    }, [isSuccess, updateSuccess])




    const handleSubmit = (event) => {
        event.preventDefault();
        const { taskName, name, projectName, deadline } = formInput;

        editTask({
            id: task.id,
            taskName,
            teamMember: team?.find((member) => member.name === name),
            project: projects?.find((project) => project.projectName === projectName),
            deadline,
            status: "pending", // default status
        });
    };

    


    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Task
                </h1>
                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                id="lws-taskName"
                                required
                                placeholder="Implement RTK Query"
                                value={formInput.taskName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select
                                id="lws-teamMember"
                                required
                                name="name"
                                value={formInput.name}
                                onChange={handleChange}
                            >
                                <option value="" hidden={true}>
                                    Select Team Member
                                </option>
                                {team?.map(({ id, name }) => (
                                    <option key={id}>{name}</option>
                                ))}


                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">Project Name</label>
                            <select id="lws-projectName" name="projectName"
                                required
                                value={formInput.projectName}
                                onChange={handleChange}
                            >
                                <option value="" hidden={true}>
                                    Select Project
                                </option>
                                {projects?.map(({ id, projectName }) => (
                                    <option key={id}>{projectName}</option>
                                ))}

                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input type="date" name="deadline" id="lws-deadline"
                                required
                                value={formInput.deadline}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-right">
                            <button disabled={isLoading} type="submit" className="lws-submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>

    )
}

export default EditTask