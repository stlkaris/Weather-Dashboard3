import React from "react";

const SearchBar = ({ city, handleSearch, handleInputChange }) => {
  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-6 justify-center">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        className="p-3 rounded-l-md rounded-border outline-none dark:bg-gray-600 dark:text-white"
      />
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
