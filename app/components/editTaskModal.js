import React, { useState, useEffect } from "react";

const EditTaskModal = ({ props }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(props.edited ?? "");
  }, [props.edited]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleTaskEditInput = () => {
    const updatedTasks = props.tasks.map((task) =>
      task.name === props.edited ? { ...task, name: inputValue } : task
    );

    props.setTasks(updatedTasks);
    props.setShow(false);
  };

  return (
    <div
      style={{ display: props.show ? "block" : "none" }}
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-black/70 transition-opacity">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-white text-2xl font-semibold mb-4 text-center">
                ✏️ Edit Task
              </h2>
              <textarea
                onChange={handleInput}
                value={inputValue}
                className="w-full h-24 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-4"
              />
              <div className="flex justify-center">
                <button
                  onClick={handleTaskEditInput}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
