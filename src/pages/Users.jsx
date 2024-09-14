import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useTable, useSortBy, usePagination } from 'react-table';
import { users } from '../components/utilities/apiServices';
import { ClipLoader } from 'react-spinners';
import { ThemeContext } from '../components/utilities/ThemeContext'; // Import the ThemeContext
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Users = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access dark mode state
  const { data: usersData, isLoading, isError, error } = useQuery('users', users);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // AOS duration can be customized
  }, []);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS animations when theme changes
  }, [isDarkMode]);



  // Memoize filtered users to avoid recalculating on every render
  const filteredUsers = useMemo(() => {
    if (!usersData) return [];
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [usersData, searchTerm]);

  // Define columns outside of the component to avoid recreation on each render
  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Address (City)', accessor: 'address.city' },
      { Header: 'Company', accessor: 'company.name' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex, pageSize, pageCount },
  } = useTable(
    {
      columns,
      data: filteredUsers,
      initialState: { pageIndex: 0, pageSize: 6 }, // Set page size to 6
    },
    useSortBy,
    usePagination
  );

  if (isLoading) {
    return (

            <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <ClipLoader size={50} color={isDarkMode ? '#ffffff' : '#123abc'} loading={isLoading} />
          </div>
    
    );
  }

  if (isError) {
    return       <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <div>Error: {error.message}</div>
  </div>

  
  }

  return (
    <div
      className={`p-4 sm:p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`} // Dynamic background and text color
      data-aos="fade-up" // Apply AOS animation
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4" data-aos="fade-down">
        <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-0">Users</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full sm:w-auto p-2 border rounded mb-4 sm:mb-0 ${
            isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'
          }`} // Dynamic search input styles
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto" data-aos="zoom-in">
        <table {...getTableProps()} className="min-w-full table-auto border-collapse">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`p-2 sm:p-4 border-b text-left text-xs sm:text-sm ${
                      isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                    }`} // Dynamic table header styles
                    key={column.id}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  data-aos="fade-right"
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className={`p-2 sm:p-4 border-b text-xs sm:text-sm ${
                        isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                      }`} // Dynamic table cell styles
                      key={cell.column.id}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col items-center" data-aos="flip-up">
        <div className="flex items-center mb-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-4 py-2 rounded disabled:opacity-50 ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
            }`} // Dynamic pagination button styles
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center mx-4">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => gotoPage(i)}
                className={`px-3 py-1 mx-1 rounded text-xs sm:text-sm ${
                  pageIndex === i
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-black'
                }`} // Dynamic page number button styles
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-4 py-2 rounded disabled:opacity-50 ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
