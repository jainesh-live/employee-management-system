import './App.css';
import EmployeeCard from './components/EmployeeCard';
import Dashboard from './pages/Dashboard';
import EmployeeDetails from './pages/EmployeeDetails';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './pages/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import DepartmentDetails from './pages/DepartmentDetails';


const sampleEmployee = {
  name: 'Ava Patel',
  email: 'ava.patel@example.com',
  department: 'Engineering',
  status: 'Active',
};

function App() {
  return (
    <main className="container-fluid mt-5 pt-4">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/add" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/add" element={<DepartmentForm />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
      </Routes>
    </main>
  );
}

export default App;
