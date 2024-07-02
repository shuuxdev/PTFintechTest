import { useEffect, useState } from 'react';
import Task from './Task.jsx';
import { TaskAPI } from '../../Apis/taskAPI.js';

const tasks = [
    { title: 'Web Design', type: 'Design', progress: 43, complete: 16 },
    { title: 'App Development', type: 'Development', progress: 43, complete: 16 },
    { title: 'Marketing & Sales', type: 'Marketing', progress: 43, complete: 16 },
    { title: 'Creative Project', type: 'Design', progress: 43, complete: 16 },
];

const MainContent = () => {
    const [tasks, setTasks] = useState([])
    const getAllTask = async () => {
        let result = await TaskAPI.getAll();
        setTasks(result);
    }
    useEffect(() => {
        getAllTask();
    }, [])
    return (
        <div className="flex-1 p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Recent Projects</h1>
                <div className="flex items-center space-x-4">
                    <input type="search" placeholder="Search" className="p-2 rounded bg-gray-700" />
                    <button className="p-2 rounded bg-green-600">+</button>
                </div>
            </header>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-6">
                {tasks.map((project, index) => (
                    <Task key={index} project={project} />
                ))}
            </div>
        </div>
    );
};

export default MainContent;
