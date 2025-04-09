import React from "react";

const Popup = ({ props }) => {
  const task = props.task;
  console.log(props);
  return (
    <div className="bg-red-600 rounded-sm px-4 py-2 flex items-center justify-between text-sm mt-2">
      <div>
        Are you sure you want to delete <strong>{task.name}...</strong> task?
      </div>
      <div>
        <button
          onClick={() => props.deleteTask(task.name)}
          className="mx-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => props.setConfirmDeleteTask(null)}
          className="mx-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Popup;
