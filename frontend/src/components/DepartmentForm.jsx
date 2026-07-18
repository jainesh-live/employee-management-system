import { useState } from "react";
import { addDepartment } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastProvider";

function DepartmentForm() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [depForm, setDepForm] = useState({
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setDepForm((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const addedDepartment = await addDepartment(depForm);
      addToast("Department added successfully", "success");
      navigate(`/departments/${addedDepartment.id}`);
    } catch (err) {
      console.error("Error adding department", err);
      addToast("Error adding department", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Department Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          required
          value={depForm.name}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : "Save Department"}
      </button>
    </form>
  );
}

export default DepartmentForm;