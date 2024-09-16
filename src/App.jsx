/** @format */

import {  useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ThemeProvider } from "./components/utilities/ThemeContext";
import MainContent from "./components/MainContent";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
        <ThemeProvider>

      <div className="flex min-h-screen ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header setSidebarOpen={setSidebarOpen} />



          <MainContent/>
 
        </div>
      </div>
      </ThemeProvider>

    </>
  );
}

export default App;
