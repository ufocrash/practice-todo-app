"use client";
import React, { useState, useEffect } from "react";
import EditTaskModal from "./editTaskModal";
import { signOut } from "next-auth/react";
import Popup from "./popup";
import Image from "next/image";
import { MdAdd } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { TbLogout } from "react-icons/tb";

const TasksNestApp = ({ session }) => {
  const [inputValue, setInputvalue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [removedTask, setRemovedTask] = useState({});
  const [edited, setEdited] = useState(null);
  const [show, setShow] = useState(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");

  const date = new Date("mm-dd-yyyy");
  console.log(date);

  // Set tasks from local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save user info in localStorage
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
  const handleInputDescription = (e) => setDescription(e.target.value);
  // Create task
  const createTask = () => {
    if (inputValue !== "") {
      setTasks([
        ...tasks,
        {
          done: false,
          name: inputValue,
          description: description,
          deadline: deadline,
        },
      ]);
    }
    // Resetăm
    setInputvalue("");
    setDescription("");
    setDeadline("");
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "all") return true;
    if (filter === "active") return !task.done;
    if (filter === "deadline") return task.deadline;
    return true;
  });

  return (
    <div className="min-h-screen mx-auto text-white px-4 py-6">
      {/* Header */}
      <header className="max-w-3xl mx-auto bg-[#2e66d7] shadow-lg rounded-lg flex items-center justify-between p-4 mb-20">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl logo flex items-center">
            <SiTask className="logoDet pr-1 mt-1" />
            <strong>TASKS NEST</strong>
          </h1>
        </div>
        <div className="flex items-center">
          {session && (
            <div className="text-lg text-gray-900 flex items-center avatarContainer mr-4">
              <Image
                className="rounded-full mr-2 border-2 border-[#0c45b1]"
                src={session?.user?.image}
                alt="Avatar"
                width="50"
                height="50"
              />
              <span className="font-bold text-white">
                {session?.user?.name}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-100 flex items-center"
          >
            <span className="mr-1">Logout</span>
            <TbLogout />
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-3xl border-gray-800 border-solid mx-auto  p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My Tasks</h1>

        {removedTask.name && (
          <div className="mb-4 p-3 bg-yellow-600 text-white rounded-md text-center">
            <span className="font-semibold">Removed task:</span>{" "}
            {removedTask.name}
          </div>
        )}

        {/* Task Creator */}

        <div className="flex gap-2 mb-6 task-creator">
          <div>
            <label htmlFor="title">Task title *</label>
            <input
              id="title"
              required
              onChange={handleInput}
              value={inputValue}
              type="text"
              placeholder="Task title*"
              className="flex-1  text-white border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="description">Task Description</label>
            <input
              id="description"
              onChange={handleInputDescription}
              value={description}
              type="text"
              placeholder="Describe your task..."
              className="flex-1  text-white border  rounded-lg px-4 py-2 focus:outline-none "
            />
          </div>
          <div>
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              onChange={(e) => setDeadline(e.target.value)}
              value={deadline}
              type="date"
              className="border text-white rounded-lg px-2 py-2 focus:outline-none "
            />
          </div>
          <button
            onClick={createTask}
            className="bg-green-800 hover:bg-green-600 text-white font-semibold rounded-lg"
          >
            <MdAdd />
          </button>
        </div>
        {/* Filters */}
        <div className="filter flex border-t-1 border-white items-center">
          <span className="text-blue-700"> Filter tasks {">"}</span>
          <div>
            <button
              onClick={() => setFilter("all")}
              className={`mr-4 px-4 py-2  ${
                filter === "all"
                  ? "text-white-900 underline font-bold decoration-2"
                  : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`mr-4 px-4 py-2  ${
                filter === "active"
                  ? "text-white-900 underline font-bold decoration-2"
                  : ""
              }`}
            >
              Active tasks
            </button>
            <button
              onClick={() => setFilter("done")}
              className={`mr-4 px-4 py-2  ${
                filter === "done"
                  ? "text-white-900 underline font-bold decoration-2"
                  : ""
              }`}
            >
              Done
            </button>
            <button
              onClick={() => setFilter("deadline")}
              className={`mr-4 px-4 py-2 ${
                filter === "deadline"
                  ? "text-white-900 underline font-bold decoration-2"
                  : ""
              }`}
            >
              Important
            </button>
          </div>
        </div>
        {/* Tasks */}
        <ul className="space-y-4">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className={`flex flex-col bg-gray-900 opacity-80 p-4 rounded-md task  ${
                task.done ? "opacity-60 taskTransition, bg-green-100" : ""
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <span className="sectionName">Title</span>
                  <p
                    className={`text-lg ${
                      task.done ? "line-through text-gray-400" : "text-white"
                    }`}
                  >
                    {task.name}
                  </p>
                  {task.description && (
                    <div>
                      <span className="sectionName">Description</span>
                      <p>{task.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => handleCheckbox(e, task.name)}
                    className="w-5 h-5 accent-green-800 text-green-500 bg-gray-800 border-gray-600"
                  />
                  {!task.done && (
                    <button onClick={() => handleShowModal(task)}>📝</button>
                  )}
                  {task.deadline ? `🗓️${task.deadline}` : ""}
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
