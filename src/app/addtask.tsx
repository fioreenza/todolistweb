import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoAdd } from 'react-icons/io5';

export default function AddTask() {
  const [todo, setTodo] = useState(false)
  const [newTodo, setNewTodo] = useState('')

  const getRandomNumber = () => {
    return Math.floor(Math.random() = 9999)
  }
  
  const handleKeyUp = (key) => {
    if (key === 'Click' && newTodo) {
      const randomNumber = getRandomNumber()

      const newItem = {
        id: 'item-${randomNumber}',
        content: newTodo
      }

      setTodo(todo.concat(newItem))

      setNewTodo('')
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        <div className='p-2 left-1/2 transform -translate-x-1/2 absolute bottom-12 rounded-full bg-[#003B5C] w-fit'>
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
            <div className='rounded-[42px] overflow-hidden px-8 py-6 flex bg-white w-full h-fit'>
            <div className='flex-col w-full'>
            <div className='font-poppins font-bold text-[22px] text-[#003B5C] text-center'>
                Add a task
            </div>
            <div className='flex-col flex mt-6 mb-4'>
                <label htmlFor="taskTitle" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Task title</label>
                <textarea value={newTodo} onChange={(e) => setNewTodo(e.target.value)} rows={2} className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold font-[#8C8C8C]' id="taskTitle" placeholder="Enter task title" />
            </div>
            <div className='flex-col flex my-4'>
                <label htmlFor="taskDate" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Date</label>
                <input className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold font-[#8C8C8C]' type="text" id="taskDate" placeholder="DD/MM/YYYY" />
            </div>
            <div className='flex-col flex my-4'>
                <label htmlFor="taskTime" className='font-poppins font-semibold text-[18px] text-[#003B5C]'>Time</label>
                <input className='bg-[#F2F2F2] focus:outline-none p-3 rounded-lg font-semibold font-[#8C8C8C]' type="text" id="taskTime" placeholder="HH:MM AM/PM" />
            </div>
            <div className='flex-col'>
            <button onKeyUp={(e) => handleKeyUp(e.key)} type='button' className='rounded-3xl bg-[#003B5C] text-[#C9EFFF] font-poppins font-semibold mt-8 p-2 text-[16px] w-full text-center' onClick={closeModal}
            >Save</button></div>
            </div> 
            </div>
              </div>
              </div>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
