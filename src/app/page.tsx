"use client"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5"
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog, Transition } from '@headlessui/react';
import React, { useState, Fragment } from 'react';

export default function Home() {
  const [todo, setTodo] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [taskTime, setTaskTime] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);
  const [showDeleteIconsGlobal, setShowDeleteIconsGlobal] = useState(false); 
  const [editTask, setEditTask] = useState(null);
  const [showEditIcons, setShowEditIcons] = useState(false);
  const [showEditIconsGlobal, setShowEditIconsGlobal] = useState(false);
  const [todos, setTodos] = useState([]);


  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = {
        id: editTask ? editTask.id : todos.length + 1,
          title: todo.trim(),
          date: taskDate ? taskDate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }) : "",
          time: taskTime,
      };

if (editTask) {
  const updatedTodos = todos.map((item) =>
        item.id === editTask.id ? newTodo : item
      );
      setTodos(updatedTodos);
      setEditTask(null); 
} else {
  setTodos([...todos, newTodo]);
}

setTodo("");
setTaskDate(null);
setTaskTime(null);
closeModal();
}
} ;

const handleGlobalDelete = () => {
  setShowDeleteIconsGlobal(!showDeleteIconsGlobal);
  setShowDeleteIcons(false);
};

const handleGlobalEdit = () => {
  setShowEditIconsGlobal(!showEditIconsGlobal);
  setShowEditIcons(false);
};

const deleteTodo = (taskToDelete) => {
  const newTodos = todos.filter((task) => {
    return task.id !== taskToDelete.id;
  });
  setTodos(newTodos);
  setShowDeleteIcons(true);
  setEditTask(null); 
};

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const editTodo = (taskToEdit) => {
    setEditTask(taskToEdit);
    setTodo(taskToEdit.title);
    setTaskDate(taskToEdit.date ? new Date(taskToEdit.date) : null);
    setTaskTime(taskToEdit.time);
    openModal();
  };

  return (
   <>
   <div className='h-screen w-screen p-6 flex justify-center'>
    <div className='px-6 py-8 bg-white border-[#003B5C] border-4 shadow-md rounded-[42px] h-full overflow-auto w-[355px] justify-center items-center'>
      <div className='font-poppins font-extrabold text-[#003B5C] text-[30px] text-center'>
      To Do List
      </div>
      <div className='mt-8 justify-center flex'>
        <div className='bg-[#C9EFFF] hover:bg-[#62d0ff] rounded-[10px] py-1 px-[5px] mx-1 w-fit h-fit cursor-pointer' onClick={handleGlobalEdit}>
        <MdEdit
        color='#003B5C'
        size={15.5}
        />
      </div>
      <div className='bg-[#C9EFFF] hover:bg-[#62d0ff] rounded-[10px] px-3 py-0.5 mx-1 w-fit h-fit cursor-pointer'>
        <div className='font-poppins font-semibold text-[13px] text-[#003B5C]'>
        All
        </div>
      </div>
      <div className='bg-[#C9EFFF] hover:bg-[#62d0ff] rounded-[10px] px-3 py-0.5 mx-1 w-fit h-fit cursor-pointer'>
        <div className='font-poppins font-semibold text-[13px] text-[#003B5C]'>
        To Do
        </div>
      </div>
      <div className='bg-[#C9EFFF] hover:bg-[#62d0ff] rounded-[10px] px-3 py-0.5 mx-1 w-fit h-fit cursor-pointer'>
        <div className='font-poppins font-semibold text-[13px] text-[#003B5C]'>
        Done
        </div>
      </div>
        <button className='bg-[#C9EFFF] hover:bg-[#49c8ff] rounded-[10px] px-2 py-1.5 mx-1 w-fit h-fit cursor-pointer' onClick={handleGlobalDelete}>
        <FaTrashAlt
        style={{ color: '#003B5C' }}
        size={11.5}/>
      </button>
      </div>
      <div className='flex-col my-6'>
      {todos?.length > 0 ? (
      <ul>
        {todos?.map((task, index) => (
        <li key={task.id} className='border-l-4 border-[#003B5C] py-6 pl-4 pr-6 justify-between items-center flex mt-6 bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] rounded-xl w-full h-16'>
        <div className='flex-col'>
        <label htmlFor={index} className="font-poppins font-semibold text-[13px]">{task.title}</label>
        <div className="flex">
        {task.date && (
      <div className='font-poppins font-semibold text-[13px] text-[#003B5C]'>
    {task.date}
    {task.time && `, ${task.time}`}
  </div>
)}

{!task.date && task.time && (
  <div className='font-poppins font-semibold text-[13px] text-[#003B5C]'>
    {task.time}
  </div>
)}
                    </div>
        </div>
        <div className='flex items-center'>
        <button className={`items-center flex ${showEditIcons || showEditIconsGlobal ? 'hidden' : ''} ${showDeleteIcons || showDeleteIconsGlobal ? 'hidden' : ''}`}>
        <input id={index} type='checkbox' className='accent-[#003B5C] w-5 h-5 rounded-lg' />
        </button>
        <button className={`bg-[#9d1818] p-2 rounded-xl cursor-pointer ${showDeleteIcons || showDeleteIconsGlobal ? '' : 'hidden'}`} onClick={() => { deleteTodo(task); }}>
        <FaTrashAlt
        style={{ color: "white" }}
        size={10}/>
        </button>
        <button className={`bg-[#ff9500] p-[6px] rounded-xl cursor-pointer ${showEditIcons || showEditIconsGlobal ? '' : 'hidden'}`} onClick={() => { editTodo(task); }}>
        <MdEdit
        style={{ color: "white" }}
        size={13}/>
        </button>
        </div>
        </li>
        ))}
      </ul>
      ) : (
        <div className="empty">
          <div className='text-center font-poppins mt-8'>No task found</div>
        </div>
      )}
      </div>
      <button type="button" onClick={openModal}>
        <div className='fixed p-2 left-1/2 transform -translate-x-1/2 bottom-12 rounded-full bg-[#003B5C] w-fit'>
          <IoAdd style={{ color: '#C9EFFF' }} size={75} />
        </div>
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
            <div className='h-screen w-screen p-6 flex justify-center'>
            <div className='bg-slate-500 bg-opacity-50 rounded-[42px] h-full justify-center items-end flex w-[355px] border-[#003B5C] border-4'>
            <div className='rounded-[42px] overflow-hidden bg-white w-full h-fit'>
            <div className="w-full bg-[#003B5C] py-2 flex items-center justify-center overflow-visible">
            <button
               onClick={closeModal}
                className='text-[#C9EFFF] cursor-pointer overflow-visible'
              >
            <IoIosCloseCircle size={25} />
            </button>
            </div>
            <div className='flex-col w-full px-8 py-6'>
            <div className='font-poppins font-bold text-[22px] text-[#003B5C] text-center'>
                Add a task
            </div>
            <div className='flex-col flex mt-6 mb-4'>
                <label htmlFor="taskTitle" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Task title</label>
                <textarea value={todo} onChange={(e) => { setTodo(e.target.value) }} rows={2} className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold font-[#8C8C8C]' id="taskTitle" placeholder="Enter task title" />
            </div>
            <div className='flex-col flex my-4'>
                <label htmlFor="taskDate" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Date</label>
                <DatePicker
                    selected={taskDate}
                    onChange={(date) => setTaskDate(date)}
                    dateFormat='dd-MM-YYYY'
                    className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold w-full font-[#8C8C8C]'
                    id="taskDate"
                    placeholderText="Select date"
                />
            </div>
            <div className='flex-col flex my-4'>
                <label htmlFor="taskTime" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Time</label>
                <input
                type="time"
                  onChange={(e) => setTaskTime(e.target.value)}
                  className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold w-full font-[#8C8C8C]'
                  id="taskTime"
                  placeholder="Select time"
                />
            </div>
            <div className='flex-col'>
            <button onClick={() => { addTodo(); closeModal(); }} type='button' className='rounded-3xl bg-[#003B5C] text-[#C9EFFF] font-poppins font-semibold mt-8 p-2 text-[16px] w-full text-center'
            >Save</button></div>
            </div>
            </div>
              </div>
              </div>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
   </div>
   </>
  );
}
