import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/DepartmentService";
import { addEmployee, fetchEmployeeById } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import PageState from "./common/PageState";
import { useToast } from "../context/ToastProvider";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { addToast } = useToast();

  const [empForm, setEmpForm] = useState({
    name: "",
    emailId: "",
    status: "",
    departmentId: "",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadFormData = async () => {
    setLoading(true);
    setErrorState(null);

    try {
      const fetchedDepartments = await fetchDepartments();
      setDepartmentList(fetchedDepartments);

      if (isEdit) {
        const editEmployee = await fetchEmployeeById(id);
        setEmpForm({
          ...editEmployee,
          departmentId: editEmployee.department.id,
        });
      }
    } catch (err) {
      console.error("Error loading employee form data", err);
      addToast("Error loading form data", "error");
      setErrorState({
        title: "Error",
        message: "Failed to load employee form data",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFormData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const addedEmployee = await addEmployee(empForm);
      addToast(
        isEdit ? "Employee updated successfully" : "Employee added successfully",
        "success",
      );
      navigate(`/employees/${addedEmployee.id}`);
    } catch (err) {
      console.error("Error saving employee", err);
      addToast("Error saving employee", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmpForm((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <PageState loading={loading} onRetry={loadFormData} errorState={errorState}>
      <div className="container mt-5 ">
        <PageHeader title={isEdit ? "Edit Employee" : "Add Employee"} />
        <form className="container mt-4" onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Employee" : "Save Employee"}
          </button>
        </form>
      </div>
    </PageState>
  );
}

export default EmployeeForm;
