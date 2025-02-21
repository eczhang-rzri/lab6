import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import EmployeeManagement from "./pages/Emp_Mgmt";

import './App.css'
import { NameProvider } from "./context/NameContext";

function App() {

  return (
    <NameProvider>
      <Router>
        <Header/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emp-mgmt" element={<EmployeeManagement />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </NameProvider>
  )
}

export default App
