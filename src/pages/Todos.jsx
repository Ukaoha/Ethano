
import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { todos } from '../components/utilities/apiServices';
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ThemeContext } from '../components/utilities/ThemeContext'; // Import ThemeContext
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Todos = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access the dark mode state
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 10;
  const pageRange = 5;
  const [filter, setFilter] = useState('all');

    // Initialize AOS
    useEffect(() => {
      AOS.init({ duration: 1000 }); // AOS duration can be customized
    }, []);
  
    useEffect(() => {
      AOS.refresh(); // Refresh AOS animations when theme changes
    }, [isDarkMode]);
  
  
  const { data: todosData, isLoading, isError, error } = useQuery('todos', todos);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>

      <ClipLoader size={50} color={isDarkMode ? '#ffffff' : '#123abc'} />
    </div>
    );
  }

  if (isError) {
    return (
     <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Filter todos based on the selected filter
  const filteredTodos = todosData?.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'notCompleted') return !todo.completed;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTodos?.length / todosPerPage);
  const startIdx = currentPage * todosPerPage;
  const endIdx = startIdx + todosPerPage;
  const paginatedTodos = filteredTodos?.slice(startIdx, endIdx);

  // Determine the range of pages to show in pagination
  const currentRangeStart = Math.floor(currentPage / pageRange) * pageRange;
  const currentRangeEnd = Math.min(currentRangeStart + pageRange, totalPages);
  const pageNumbers = Array.from({ length: currentRangeEnd - currentRangeStart }, (_, i) => currentRangeStart + i);

  // Handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Previous / Next navigation
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={`p-4-8 p-6 min-h-screen  mx-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    data-aos="fade-up" // Apply AOS animation

    >
      {/* Todos Header */}
      <div className='flex justify-between items-center mb-4 p-2' data-aos="fade-down" // Apply AOS animation
      >
        <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-0">Todos</h2>

        {/* Filter Select Dropdown */}
        <div className="flex space-x-4 items-center">
          <span>Filter by:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
      </div>

      {/* Todos Table */}
      <div className="overflow-x-auto">
        <table className={`table-auto w-full border-collapse border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} data-aos="zoom-in">
          <thead>
            <tr className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <th className={`px-4 py-2 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} text-left`}>Todo Title</th>
              <th className={`px-4 py-2 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} text-center`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos?.map(todo => (
              <tr key={todo.id} className={`${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}                   data-aos="fade-right"
>
                <td className={`px-4 py-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>{todo.title}</td>
                <td className={`px-4 py-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} text-center`}>
                  {todo.completed ? (
                    <span className="flex items-center justify-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      Not Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center space-x-2" data-aos="flip-up">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}`}
          >
            {pageNumber + 1}
          </button>
        ))}

        {/* Ellipsis and Last Page */}
        {totalPages > currentRangeEnd && (
          <>
            <span>...</span>
            <button
              onClick={() => handlePageClick(totalPages - 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === totalPages - 1 ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Todos;
