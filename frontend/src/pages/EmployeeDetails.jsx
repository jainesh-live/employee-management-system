import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEmployeeById, deleteEmployee } from "../services/EmployeeService";
import StatusSpan from "../components/StatusSpan";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function EmployeeDetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      const emp = await fetchEmployeeById(id);
      setEmployee(emp);
    };

    getEmployee();
  }, [id]);

  const deleteEmployeeById = async (id) => {
    try {
      const response = await deleteEmployee(id)

      if(!response) {
        alert("Error deleting  employee")
      }

      alert(`Deleted employee with Id #${id}`)
      navigate('/')

    } catch (err) {
      console.error("Error deleting employee", err)
    } finally {

    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this employee #${id}?`
    );

    if (!confirmed) {
      return;
    }

    await deleteEmployeeById(id);
    // Refresh the list
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mt-4">
      <PageHeader title="Employee Details" />
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

              <p className="text-muted">Employee ID: {employee.id}</p>
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
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
          <Link
            to={`/employees/edit/${employee.id}`}
            className="btn btn-warning"
          >
            Edit
          </Link>
          <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </main>
  );
}

export default EmployeeDetails;
