import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTaskMutation, useUpdateStatusMutation } from '../../features/tasks/tasksApi';
import { DeleteIcon, EditIcon } from '../shared/Icons';

const Task = ({ task }) => {
    const { id, project, teamMember, taskName, deadline, status } = task;
    const [updateStatus] = useUpdateStatusMutation();
    const [deleteTask] = useDeleteTaskMutation();
    return (
        <div className="lws-task">
            <div className="flex items-center gap-2 text-slate">
                <h2 className="lws-date">{moment(deadline).format('DD')}</h2>
                <h4 className="lws-month">{moment(deadline).format('MMMM')}</h4>
            </div>
            <div className="lws-taskContainer">
                <h1 className="lws-task-title">{taskName}</h1>
                <span className={`lws-task-badge ${project.colorClass}`}>{project.projectName}</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src={teamMember.avatar} className="team-avater" />
                    <p className="lws-task-assignedOn">{teamMember.name}</p>
                </div>
                {status === "completed" ? <button className="lws-delete">
                    <DeleteIcon onClick={() => deleteTask(id)} />
                </button>
                    :
                    <Link to={`/edit/${id}`} className="lws-edit">
                        <EditIcon />
                    </Link>}
                <select
                    className="lws-status"
                    value={status}
                    onChange={(e) => updateStatus({ id, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    )
}

export default Task