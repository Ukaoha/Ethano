/** @format */

import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Settings from "./pages/Settings";
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from "./components/utilities/ThemeContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
        <ThemeProvider>

      <div className="flex min-h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="">
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
          </main>
 
        </div>
      </div>
      </ThemeProvider>

    </>
  );
}

export default App;
