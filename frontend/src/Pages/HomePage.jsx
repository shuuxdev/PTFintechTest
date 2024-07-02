import PlusButton from '../Components/Button/PlusButton.jsx';
import NavBar from '../Components/Layout/Navbar.jsx';
import SearchBar from '../Components/Filter/Searchbar.jsx';
import Sidebar from '../Components/Layout/Sidebar.jsx'
import { TaskItem } from '../Components/Task/TaskItem.jsx';
import { TaskList } from '../Components/Task/TaskList.jsx';
import TaskModal from '../Components/Task/TaskModal.jsx';
const mockTask = {
    title: 'Complete the project',
    description: 'Finish the task management system project',
    status: 'In Progress',
    dueDate: '2024-07-10',
};
const HomePage = () => {


    return (
        <div className="bg-gray-100 min-h-screen  flex flex-col items-center">
            <NavBar />
            <h1 className="text-3xl font-bold my-8">Task Management System</h1>
            <TaskList />
            <TaskModal />
        </div>
    );
};

export default HomePage;