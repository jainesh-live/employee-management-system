import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/DepartmentService";
import { addEmployee, fetchEmployeeById } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [empForm, setEmpForm] = useState({
    name: "",
    emailId: "",
    status: "",
    departmentId: "",
  });
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    const getDepartmentList = async () => {
      try {
        const fetchedDepartments = await fetchDepartments();
        setDepartmentList(fetchedDepartments);
      } catch (err) {
        console.error("Error fetching department list", err);
      } finally {
      }
    };

    const getEditEmployee = async () => {
      try {
        const editEmployee = await fetchEmployeeById(id)
        console.log(editEmployee)
        const empForm = {...editEmployee, departmentId: editEmployee.department.id};

        setEmpForm(empForm)
      } catch (err) {
        console.error("Error getting edit employee", err);
      } finally {

      }
    }

    getDepartmentList();

    if(isEdit) {
      getEditEmployee();
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedEmployee = await addEmployee(empForm);
      navigate(`/employees/${addedEmployee.id}`)
    } catch (err) {
      console.error("Error adding employee", err);
      alert("Error adding employee, try again later");
    }
  };

  const handleChange = (e) => {
    setEmpForm((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mt-5 ">
    <PageHeader title="Add Employee" />
    <form className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          required
          value={empForm.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="emailId" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailId"
          name="emailId"
          placeholder="Enter email"
          required
          value={empForm.emailId}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          value={empForm.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="departmentId" className="form-label">
          Department
        </label>

        <select
          className="form-select"
          id="departmentId"
          name="departmentId"
          value={empForm.departmentId}
          onChange={handleChange}
          
        >
          <option value="">Select Department</option>
          {departmentList.map((dep) => {
            return (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            );
          })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save Employee
      </button>
    </form>
    </div>
  );
}

export default EmployeeForm;
