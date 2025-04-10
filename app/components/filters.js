import React, { useState } from "react";

const Filters = () => {
  return (
    <div className="filter flex border-t-1 border-white">
      <button className="mr-4 px-4 py-2 hover:text-red-200">
        Active tasks
      </button>
      <button
        onClick={() => setFilter("done")}
        className="mr-2 px-4 py-2 hover:text-red-200"
      >
        Done
      </button>
      <button className="mr-2 px-4 py-2 hover:text-red-200">All</button>
      <button className="mr-2 px-4 py-2 hover:text-red-200">Expired</button>
    </div>
  );
};

export default Filters;
