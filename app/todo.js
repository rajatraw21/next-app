"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTaskAdd = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTaskAdd();
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-4 w-[1502px] h-[800px] relative overflow-hidden ">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={handleInputChange}
          className="border rounded py-2 px-3 text-black"
          onKeyDown={handleInputKeyDown}
        />
        <button
          onClick={handleTaskAdd}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchValue}
          onChange={handleSearchChange}
          className="border rounded py-2 px-3 text-black"
        />
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`${
              task.completed ? "line-through text-gray-400" : ""
            } py-2 flex items-center`}
          >
            {task.text}
            <button
              onClick={() => handleTaskComplete(task.id)}
              className={`${
                task.completed ? " bg-gray-500" : "bg-green-500"
              } text-white px-2 py-1 ml-2 rounded`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => handleTaskDelete(task.id)}
              className={`${
                task.completed ? "bg-gray-500" : "bg-red-500"
              } text-white px-2 py-1 ml-2 rounded`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
