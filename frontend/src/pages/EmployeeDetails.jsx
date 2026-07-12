import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchEmployeeById } from "../services/EmployeeService";
import StatusSpan from "../components/StatusSpan";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      const emp = await fetchEmployeeById(id);
      setEmployee(emp);
    };

    getEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mt-4">
  <div className="card shadow">
    <div className="card-header d-flex justify-content-between align-items-center">
      <StatusSpan status={employee.status}></StatusSpan>
    </div>

    <div className="card-body">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-3 text-center border-end">
          <img
            src="https://i.pravatar.cc/180"
            alt="Employee"
            className="rounded-circle img-fluid mb-3"
          />

          <h4>{employee.name}</h4>

          <p className="text-muted">
            Employee ID: {employee.id}
          </p>
        </div>

        {/* Right Column */}
        <div className="col-md-9">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="fw-bold">Email</label>
              <p>{employee.emailId}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">Department</label>
              <p>{employee.department.name}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="fw-bold">Status</label>
              <p>{employee.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="card-footer d-flex justify-content-end gap-2">
      <button className="btn btn-secondary">Back</button>
      <button className="btn btn-warning">Edit</button>
      <button className="btn btn-danger">Delete</button>
    </div>
  </div>
</main>
  );
}

export default EmployeeDetails;