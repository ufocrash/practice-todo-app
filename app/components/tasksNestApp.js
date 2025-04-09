"use client";
import React, { useState, useEffect } from "react";
import EditTaskModal from "./editTaskModal";
import { signOut } from "next-auth/react";
import Popup from "./popup";
import Image from "next/image";

const TasksNestApp = ({ session }) => {
  const [inputValue, setInputvalue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [removedTask, setRemovedTask] = useState({});
  const [edited, setEdited] = useState(null);
  const [show, setShow] = useState(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const [deadline, setDeadline] = useState("");

  const date = new Date("mm-dd-yyyy");
  console.log(date);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (session) {
      localStorage.setItem("user", JSON.stringify(session.user));
    }
  }, [session]);

  const handleShowModal = (task) => {
    setEdited(task.name);
    setShow(true);
  };

  const handleInput = (e) => setInputvalue(e.target.value);

  // Create task
  const createTask = () => {
    if (inputValue !== "") {
      setTasks([
        ...tasks,
        { done: false, name: inputValue, deadline: deadline },
      ]);
    }
    setInputvalue("");
    setDeadline(""); // Resetăm
  };

  const deleteTask = (taskName) => {
    const deletedTask = tasks.filter((task) => task.name !== taskName);
    const deleted = tasks.filter((task) => task.name === taskName);
    setTasks(deletedTask);
    setRemovedTask(deleted[0] || {});
    setConfirmDeleteTask(null);
    setTimeout(() => setRemovedTask({}), 5000);
  };

  const handleCheckbox = (e, taskName) => {
    const updatedTasks = tasks.map((chkTsk) =>
      chkTsk.name === taskName ? { ...chkTsk, done: e.target.checked } : chkTsk
    );
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    signOut();
  };

  console.log(session);
  return (
    <div className="min-h-screen mx-auto text-white px-4 py-6">
      {/* Header */}
      <header className="max-w-3xl mx-auto bg-gray-400 shadow-lg rounded-lg flex items-center justify-between p-4 mb-8">
        <div className="flex items-center gap-4">
          <h3 className="text-lg text-gray-900">
            <strong>TASKS NEST</strong>
          </h3>
        </div>
        <div className="flex items-center">
          {session && (
            <div className="text-lg text-gray-900 flex items-center pr-4">
              <Image
                className="rounded-full mr-2"
                src={session?.user?.image}
                alt="Avatar"
                width="50"
                height="50"
              />
              <span className="font-bold">{session?.user?.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-3xl border-gray-800 border-solid mx-auto  p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 My Tasks</h1>

        {removedTask.name && (
          <div className="mb-4 p-3 bg-yellow-600 text-white rounded-md text-center">
            <span className="font-semibold">Removed task:</span>{" "}
            {removedTask.name}
          </div>
        )}

        {/* Task Creator */}
        <div className="flex gap-2 mb-6">
          <input
            onChange={handleInput}
            value={inputValue}
            type="text"
            placeholder="Enter task"
            className="flex-1  text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            type="date"
            className="border border-gray-600  text-white rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createTask}
            className="bg-green-800 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Add task
          </button>
        </div>

        {/* Tasks */}
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex flex-col bg-gray-700 opacity-80 p-4 rounded-md  ${
                task.done ? "opacity-60, bg-green-200" : ""
              }`}
            >
              <div className="flex justify-between">
                <p
                  className={`text-lg ${
                    task.done ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {task.name}
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => handleCheckbox(e, task.name)}
                    className="w-5 h-5 accent-green-800 text-green-500 bg-gray-800 border-gray-600"
                  />
                  {task.deadline ? `🗓️${task.deadline}` : ""}
                  {!task.done && (
                    <button onClick={() => handleShowModal(task)}>📝</button>
                  )}
                  <button onClick={() => setConfirmDeleteTask(task.name)}>
                    🗑️
                  </button>
                </div>
              </div>
              <div>
                {confirmDeleteTask === task.name && (
                  <Popup props={{ task, deleteTask, setConfirmDeleteTask }} />
                )}
              </div>
            </li>
          ))}
        </ul>

        <EditTaskModal
          props={{ show, setShow, edited, setEdited, tasks, setTasks }}
        />
      </div>
    </div>
  );
};

export default TasksNestApp;
