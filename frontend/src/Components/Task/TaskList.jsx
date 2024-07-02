import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TaskItem } from "./TaskItem.jsx"
import { deleteTask, fetchAllTasks, fetchAssignedTasks } from "../../Slices/tasksSlice.js"
import DeleteTaskModal from "../Notification/DeleteTaskModal.jsx"
import SearchBar from "../Filter/Searchbar.jsx"
import SortBar from "../Filter/SortBar.jsx"
import FilterBar from "../Filter/FilterBar.jsx"
import PlusButton from "../Button/PlusButton.jsx"
import useAuthInfo from "../../Hooks/useAuthInfo.jsx"
import UserFilter from "../Filter/UserFilter.jsx"

export const TaskList = () => {
    const tasks = useSelector(state => state.tasks.items)
    const dispatch = useDispatch();
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [keyword, setKeyword] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null); // State to hold selected user ID
    const { roles, username } = useAuthInfo();
    let isAdmin = roles.includes("Admin");
    const handleDelete = (taskId) => {
        setSelectedTaskId(taskId);
        setConfirmDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTask(selectedTaskId))
        setConfirmDeleteModalVisible(false);
    };

    const handleCancelDelete = () => {
        setSelectedTaskId(null);
        setConfirmDeleteModalVisible(false);
    };
    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);
    useEffect(() => {
        if (isAdmin) {
            dispatch(fetchAllTasks());

        }
        else {
            dispatch(fetchAssignedTasks());

        }
    }, [])

    useEffect(() => {
        handleFilterAndSort();
    }, [tasks, filterStatus, sortOrder, keyword, selectedUserId]);

    const handleSearch = (e) => {
        let keyword = e.target.value;
        setKeyword(keyword);

    };
    const handleFilter = (status) => {
        setFilterStatus(status);
    };
    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
    };

    const handleSort = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleFilterAndSort = () => {
        let filtered = [...tasks];
        if (filterStatus !== 'all') {
            filtered = filtered.filter(task => task.status.toLowerCase().includes(filterStatus));
        }
        if (keyword) {
            filtered = filtered.filter(task => task.title.toLowerCase().includes(keyword.toLowerCase()));
        }
        if (selectedUserId != null) {
            filtered = filtered.filter((task) => task.assignedTo === selectedUserId);
        }
        if (sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else {
            filtered = filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        }
        setFilteredTasks(filtered);
    };
    return (
        <div className="w-full max-w-screen-xl p-4">

            <SearchBar onSearch={handleSearch} />
            <div className="flex items-center flex-wrap py-4 gap-2">
                <SortBar onSort={handleSort} sortOrder={sortOrder} />
                <FilterBar onFilter={handleFilter} />
                {
                    isAdmin &&
                    <UserFilter onSelectUser={handleSelectUser} />
                }
                <PlusButton />


            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">

                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.taskId}
                        task={task}
                        onDelete={() => handleDelete(task.taskId)}
                    />
                ))}
                <DeleteTaskModal
                    visible={confirmDeleteModalVisible}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            </div>
        </div>
    )
}