import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    setDate(t[0].date)
    setTime(t[0].time)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    if (window.confirm("ARE U SURE U WANT TO DELETE THIS TASK?")) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos)
      saveToLS()
    }
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, date, time }])
    setTodo("")
    setDate("")
    setTime("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }
  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    < >
      <div className='bg-blue-600 h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden'>
        <Navbar />
        <div className="container bg-white h-[70%] w-full m-10 md:w-[70%] md:mx-auto md:my-10 p-5 rounded-lg shadow-2xl overflow-auto">
          <div className='flex max-sm:flex-col justify-between items-center mb-5 gap-2 flex-wrap sticky top-0 bg-blue-200 p-2'>
            <input onChange={handleChange} value={todo} className='border border-blue-700 p-2 rounded-lg max-sm:w-full md:flex-grow ' type="text" name="todo" id="" />
            <div className='flex justify-between items-center gap-2 max-sm:w-full'>
              <input onChange={handleDateChange} value={date} className='border border-blue-700 p-2 rounded-lg max-sm:w-1/2' type="date" name="date" id="" />
              <input onChange={handleTimeChange} value={time} className='border border-blue-700 p-2 rounded-lg max-sm:w-1/2' type="time" name="time" id="" />
            </div>
            <button onClick={handleAdd} disabled={todo.length < 3} className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded "><RiStickyNoteAddFill className='cursor-pointer h-7 w-7' /></button>
          </div>
          <div className="tcom">
            <input className='cursor-pointer' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="show" />
            <label htmlFor="show">Tasks completed</label>
          </div>
          <div className="todos w-full flex flex-col my-1 bg-blue-200 p-3 rounded-lg align-middle overflow-auto">
            {todos.length === 0 && <p className='text-center text-gray-500'>No tasks added yet!</p>}
            {todos.map((item) => {
              return ((showFinished || !item.isCompleted) && <div key={item.id} className="todo-item flex items-center justify-between wrap-anywhere min-h-1 w-full my-2 p-2 bg-white rounded-lg shadow-black text-black  gap-1 ">
                <input className='cursor-pointer' onChange={handleCheckbox} type="checkbox" name={item.id} id="" />
                <div className='w-[75%] flex max-sm:flex-col max-sm:items-start justify-start items-center gap-2'>
                  <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                  <span className='text-gray-500 text-sm hover:cursor-pointer'>{item.date ? new Date(item.date).toLocaleDateString() : "No date set"}</span>
                  <span className='text-gray-500 text-sm hover:cursor-pointer'>{item.time ? `${item.time}` : "No time set"}</span>
                </div>
                <div className="buttons flex max-sm:flex-col gap-2 w-[100px] justify-end items-center">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded cursor-pointer max-sm:w-1/2'><MdOutlineEditNote className='sm:h-7 sm:w-7 flex justify-center items-start' /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded cursor-pointer max-sm:w-1/2'><MdDeleteSweep className='sm:h-7 sm:w-7 flex justify-center items-center' /></button>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
