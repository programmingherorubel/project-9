import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import Error from '../shared/Error';
import Loading from '../shared/Loading';

// import akash from '../../assets/avatars/akash.png'
// import ferdous from '../../assets/avatars/ferdous.png'
// import sadh from '../../assets/avatars/sadh.png'
// import salahuddin from '../../assets/avatars/salahuddin.png'
// import sumit from '../../assets/avatars/sumit.png'
import AddBtn from './AddBtn';
import Task from './Task';

const TaskList = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const { search } = useSelector(state => state.filter)
  const { filter } = useSelector(state => state.filter)
  // print on the ui 
  let content = null;
  if (isLoading) content = <Loading msg="Loading tasks..." />;
  if (isError) content = <Error error="Error loading tasks" />;
  if (!isError && !isLoading && tasks.length < 1) content = <Error error="No tasks found" />;
  if (!isError && !isLoading && tasks.length > 0) content = tasks
    .filter(task => task.taskName.toLowerCase().includes(search) && task)
    .filter(task => filter.includes(task.project.projectName) ? true : false)
    .map(task => <Task key={task.id} task={task} />)

  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">

      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">

        <AddBtn />

        <div className="lws-task-list">
          {content}
        </div>
      </main>

    </div>

  )
}

export default TaskList