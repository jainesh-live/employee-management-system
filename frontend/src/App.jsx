import './App.css';
import EmployeeCard from './components/EmployeeCard';
import Dashboard from './pages/Dashboard';
import EmployeeDetails from './pages/EmployeeDetails';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

const sampleEmployee = {
  name: 'Ava Patel',
  email: 'ava.patel@example.com',
  department: 'Engineering',
  status: 'Active',
};

function App() {
  return (
    <main className="container-fluid">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </main>
  );
}

export default App;
